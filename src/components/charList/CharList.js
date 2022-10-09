import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadingChars, setLoadingChars] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnd, setCharsEnd] = useState(false);

    useEffect(() => {
        onRequest();
    }, []);

    const marvelService = new MarvelService();

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setError(false);
        setLoadingChars(false);
        setOffset(offset => offset + 9);
        setCharsEnd(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
        setLoadingChars(false);
    }

    const onLoadingChars= () => {
        setLoadingChars(true);
        setError(false);
    }

    const onRequest = (offset) => {
        onLoadingChars();

        marvelService
            .getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError);
    }

    const itemRefs = useRef([]);

    const onFocusItem = (id) => {
        itemRefs.current[id].forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const viewChars = chars.map((char, i) => <View 
        key={char.id} 
        onSelectedChar={props.onSelectedChar} 
        char={char}
        onFocusItem={onFocusItem}
        index={i}
    />);
    
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
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = (props) => {
    const {id, name, thumbnail} = props.char;
    const index = props.index;

    const imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?
    {objectFit: "unset"} : {objectFit: "cover"};

    return (
        <li 
            tabIndex='0'
            // ref={props.setRef}
            onClick={() => {
                props.onSelectedChar(id);
                props.onFocusItem(index);
            }}
            onKeyPress={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    props.onSelectedChar(id);
                    props.onFocusItem(index);
                }
            }}
            className="char__item"
        >
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;