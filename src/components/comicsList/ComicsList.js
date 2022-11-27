import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, loadingNewComics) => {
    switch(process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return loadingNewComics ? (
                <ul className="comics__grid">
                    <TransitionGroup component={null}>
                        {Component}
                    </TransitionGroup>
                </ul>
            ) : <Spinner/>;
        case 'error':
            return <ErrorMessage/>;
        case 'confirmed':
            return (
                <ul className="comics__grid">
                    <TransitionGroup component={null}>
                        {Component}
                    </TransitionGroup>
                </ul>
            );
        default:
            throw new Error('unexpected process state');
    }
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [loadingComics, setloadingComics] = useState(false);
    const [offset, setOffset] = useState(20);
    const [charsEnd, setComicsEnd] = useState(false);

    const {clearError, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
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
            .then(loadedComics)
            .then(() => setProcess('confirmed'));
    }

    const items = comics.map((comic, i) => {
        const {thumbnail, title, price, id} = comic;

        return (
            <CSSTransition key={id} timeout={300} classNames="comics__item">
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            </CSSTransition>
        )
    });

    return (
        <div className="comics__list">
            {setContent(process, items, loadingComics)}
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