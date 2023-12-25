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

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
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