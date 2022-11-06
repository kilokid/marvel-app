import './searchPanel.scss';

const SearchPanel = () => {
    return (
        <div class="char__search">
            <h3 className="char__find">Or find a character by name:</h3>
            <form className="char__form">
                <label className="char__form-label">Character Name</label>
                <input className="char__form-input" placeholder="Enter name" />
                <button className="button button__main">
                    <div className="inner">Find</div>
                </button>
            </form>
        </div>
    );
};

export default SearchPanel;