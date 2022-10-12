import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [loadingComics, setloadingComics] = useState(false);
    const [offset, setOffset] = useState(20);
    const [charsEnd, setComicsEnd] = useState(false);

    const {loading, error, clearError, getComics} = useMarvelService();

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
        getComics(offset)
            .then(loadedComics);
    }

    const items = comics.map((comic, i) => {
        const {thumbnail, title, price, id} = comic;

        return (
            <li className="comics__item" key={id}>
                <a href="#">
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}$</div>
                </a>
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
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;