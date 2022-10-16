import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, clearError, getComic} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoading = (comic) => {
        setComic(comic);
    }

    const updateComic = () =>{
        clearError();
        getComic(comicId)
            .then(onComicLoading);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, price, id, description, language, pages} = comic;
    
    return(
        <div className="single-comic" key={id}>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics/" className="single-comic__back">Back to all</Link>
        </div>
    )
};

export default SingleComicPage;