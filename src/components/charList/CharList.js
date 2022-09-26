import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        loadingChars: false,
        offset: 210,
        charsEnd: false,
    };

    componentDidMount() {
        this.onRequest();
    }

    marvelService = new MarvelService();

    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newChars],            
            loading: false,
            error: false,
            loadingChars: false,
            offset: offset + 9,
            charsEnd: ended,
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
            loadingChars: false,
        });
    }

    onLoadingChars= () => {
        this.setState({
            loadingChars: true,
            error: false,
        })
    }

    onRequest = (offset) => {
        this.onLoadingChars();

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }
    
    render() {
        const {chars, loading, error, offset, loadingChars, charsEnd} = this.state;
        
        const viewChars = chars.map((char) => <View key={char.id} onSelectedChar={this.props.onSelectedChar} char={char}/>);
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? viewChars : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={loadingChars}
                    style={{'display': charsEnd ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}
                >
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

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;