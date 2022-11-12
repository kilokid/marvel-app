import { useState} from 'react';
import useMarvelService from '../../services/MarvelService';

import './searchPanel.scss';

const SearchPanel = () => {
    const [searchName, setSearchName] = useState('');
    const [char, setChar] = useState({});

    const {loading, error, clearError, getCharacterName} = useMarvelService();

    const submitForm = (evt) => {
        evt.preventDefault();

        onRequest(searchName);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    
    const onRequest = (name) => {
        clearError();
        getCharacterName(name)
            .then(onCharLoaded);
    }

    return (
        <div className="char__search">
            <h3 className="char__find">Or find a character by name:</h3>
            <form id="formSubmit" onSubmit={(evt) => submitForm(evt)} className="char__form" type="submit">
                <label className="char__form-label">Character Name</label>
                <input form="formSubmit" onChange={({target}) => setSearchName(target.value)} value={searchName} className="char__form-input" placeholder="Enter name" name="char" type="text" />
                <button className="button button__main">
                    <div className="inner">Find</div>
                </button>
            </form>
        </div>
    );
};

export default SearchPanel;