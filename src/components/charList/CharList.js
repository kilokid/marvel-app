import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loadingChars, setLoadingChars] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnd, setCharsEnd] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const {loading, error, clearError, getAllCharacters} = useMarvelService();

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setLoadingChars(false);
        setOffset(offset => offset + 9);
        setCharsEnd(ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setLoadingChars(false) : setLoadingChars(true);

        clearError();
        getAllCharacters(offset)
            .then(onCharsLoaded);
    }

    const itemRefs = useRef([]);

    const onFocusItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const viewChars = chars.map((char, i) => {
        return(
        <CSSTransition key={char.id} timeout={300} classNames='char__item'>
                <View
                    key={char.id} 
                    onSelectedChar={props.onSelectedChar} 
                    char={char}
                    onFocusItem={onFocusItem}
                    itemRefs={itemRefs}
                    index={i}
                />
            </CSSTransition>
        )
    });
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingChars ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {viewChars}
                </TransitionGroup>
            </ul>
            <button 
                className="button button__main button__long"
                disabled={loadingChars}
                style={{'display': charsEnd ? 'none' : 'block'}}
                onClick={() => onRequest(offset, false)}
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
            ref={el => props.itemRefs.current[index] = el}
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