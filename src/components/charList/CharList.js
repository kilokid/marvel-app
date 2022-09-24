import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.updateChars();
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        this.setState({
            chars,            
            loading: false,
            error: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    onLoading = () => {
        this.setState({
            loading: true,
            error: false,
        });
    }

    updateChars = () => {
        this.onLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }
    
    render() {
        const {loading, error} = this.state;

        const chars = this.state.chars.map((char) => <View key={char.id} onSelectedChar={this.props.onSelectedChar} char={char}/>);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? chars : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = (props) => {
    const {id, name, thumbnail} = props.char;

    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?
    {objectFit: "unset"} : {objectFit: "cover"};

    return (
        <li onClick={() => props.onSelectedChar(id)} className="char__item char__item_selected">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

export default CharList;