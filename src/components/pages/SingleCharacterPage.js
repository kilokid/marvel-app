import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [char, setChar] = useState(null);

    const {clearError, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [characterId]);

    const onCharLoading = (char) => {
        setChar(char);
    }

    const updateChar = () =>{
        clearError();
        getCharacter(characterId)
            .then(onCharLoading)
            .then(() => setProcess('confirmed'));
    }

    return (
        <>
            <AppBanner />
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {thumbnail, name, id, fullDecription} = data;
    
    return(
        <div className="single-char" key={id}>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{fullDecription}</p>
            </div>
            <Link to="/" className="single-char__back">Back to main page</Link>
        </div>
    )
};

export default SingleCharacterPage;