import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchPanel from "../searchPanel/SearchPanel";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onSelectedChar = (id) => {
        setChar(id);
    }

    return(
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedChar={onSelectedChar} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <div className="char__content-aside">
                        <CharInfo charId={selectedChar}/>
                        <SearchPanel />
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
}

export default MainPage;