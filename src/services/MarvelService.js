class MarvelService {
    _apibase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=5f4e79f3aaf80400e01eef32adfeb29f';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apibase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apibase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;