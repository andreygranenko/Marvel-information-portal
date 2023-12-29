class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=6c5becd0979e19918d5c07425979c994';
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res =  await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    static onImageNotFound = (obj) => {
        if (obj.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            return {objectFit: "contain"};
        } else {
            return null;
        }
    }

    onNoDesc = (description) => {
        if (!description) {
            return 'There is no description for this character';
        } else {
            return description;
        }
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: this.onNoDesc(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}
export default MarvelService;

// const postData = async (url, data) => {
//     let res = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: data
//     });
//
//     return await res.json();
// }
//
// async function getResource(url) {
//     let res = await fetch(url);
//
//     if (!res.ok) {
//         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     }
//
//     return await res.json();
// }
//
// export {postData};
// export {getResource};