import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const _apibase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=5f4e79f3aaf80400e01eef32adfeb29f';
    const _baseOffset = 210;

    const {loading, request, error, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apibase}characters?limit=9&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apibase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apibase}comics?limit=8&offset=${offset}&${_apiKey}`);
        
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices.price ? comic.prices.price : 'not price', 
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getComics};
}

export default useMarvelService;