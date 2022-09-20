import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        chars: [],
        loading: false,
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

    updateChars = () => {
        this.setState({loading: !this.state.loading});

        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
        
        this.setState({
            loading: !this.state.loading,
            error: !this.state.error,
        });
    }
    
    render() {
        const chars = this.state.chars.map((char, i) => <View key={i} char={char}/>);

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {chars}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = (char) => {
    console.log(char);
    const {name, thumbnail} = char.char;

    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?
    {objectFit: "contain", height: "auto"} : {objectFit: "cover"};

    return (
        <li className="char__item char__item_selected">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

export default CharList;