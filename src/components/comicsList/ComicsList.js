import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [loadingComics, setloadingComics] = useState(false);
    const [offset, setOffset] = useState(20);
    const [charsEnd, setComicsEnd] = useState(false);

    const {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const loadedComics = (newComics) => {
        let ended;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setloadingComics(false);
        setComicsEnd(ended)
    }

    const onRequest = (offset, initial) => {
        initial ? setloadingComics(false) : setloadingComics(true);

        clearError();
        getAllComics(offset)
            .then(loadedComics);
    }

    const items = comics.map((comic, i) => {
        const {thumbnail, title, price, id} = comic;

        return (
            <li className="comics__item" key={i}>
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </Link>
            </li>
        )
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingComics ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                {items}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset, false)}
                disabled={loadingComics}
                style={{'display': charsEnd ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;