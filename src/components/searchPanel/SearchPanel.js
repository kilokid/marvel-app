import { useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import './searchPanel.scss';
import { Link } from 'react-router-dom';

const validate = Yup.object().shape({
   char: Yup.string()
     .required('This field is required')
 });

const SearchPanel = () => {
    const [char, setChar] = useState({});
    const [loadedChar, setLoadedChar] = useState(false);

    const {loading, error, clearError, getCharacterName} = useMarvelService();

    const submitForm = (name) => {
        onRequest(name);
    }

    const onCharLoaded = (char) => {
        if (!char) {
            setLoadedChar(false);
            return;
        }

        setChar(char);
        setLoadedChar(true);
    }
    
    const onRequest = (name) => {
        clearError();
        getCharacterName(name)
            .then(onCharLoaded);
    }

    return (
        <div className="char__search">
            <h3 className="char__find">Or find a character by name:</h3>
            <Formik
                initialValues={{
                    char: '',
                }}
                onSubmit={(values, { resetForm }) => {
                    submitForm(values.char)
                    resetForm();
                }}
                validationSchema={validate}
            >
                {({ errors, touched }) => (
                    <Form className="char__form" type="submit">
                        <label className="char__form-label">Character Name</label>
                        <Field
                            id="char"
                            className="char__form-input"
                            placeholder="Enter name"
                            name="char"
                            type="text"
                        />
                        <button disabled={loading} className="button button__main" type="submit">
                            <div className="inner">Find</div>
                        </button>
                        {errors.char && touched.char && !loadedChar && !error ? (
                            <p className='char__form-error'>{errors.char}</p>
                        ) : null}
                        {error && !loadedChar ? (
                            <p className='char__form-error'>The character was not found. Check the name and try again</p>
                        ) : null}
                        {loadedChar && !error ? (
                            <div className='char__form-success'>
                                <p className='char__form-success-text'>{`There is! Visit ${char.name} page?`}</p>
                                <Link to={`/characters/${char.id}`} className='button button__secondary'>
                                    <div className="inner">TO PAGE</div>
                                </Link>
                            </div>
                        ): null}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SearchPanel;