import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [char, setChar] = useState(null);

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [characterId]);

    const onCharLoading = (char) => {
        setChar(char);
    }

    const updateChar = () =>{
        clearError();
        getCharacter(characterId)
            .then(onCharLoading);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {thumbnail, name, id, description} = char;
    
    return(
        <div className="single-char" key={id}>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back">Back to main</Link>
        </div>
    )
};

export default SingleCharacterPage;