import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {clearError, getComic, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line
    }, [comicId]);

    const onComicLoading = (comic) => {
        setComic(comic);
    }

    const updateComic = () =>{
        clearError();
        getComic(comicId)
            .then(onComicLoading)
            .then(() => setProcess('confirmed'));
    }

    return (
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const {thumbnail, title, price, id, description, language, pages} = data;
    
    return(
        <div className="single-comic" key={id}>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
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