import {useEffect, useState} from "react";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import marvelService from "../../services/MarvelService";
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {
    const [char, setChar] = useState(null);


    useEffect(() => {
        updateChar();
    }, []);


    const {loading, error, getCharacter, onImageNotFound, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }



    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // console.log(id);
        getCharacter(id)
            .then(onCharLoaded)
    }


    const stringLenCheck = (str) => {
        if (str && str.length > 210) {
            return str.slice(0, 210) + '...';
        }
    }

    const imgStyle = char ? onImageNotFound(char) : null;
    console.log(error, loading)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && char ? <View char={char} imgStyle={imgStyle} stringLenCheck={stringLenCheck}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img  src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({char, imgStyle, stringLenCheck}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        <div className="randomchar__block">
            <img style={imgStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? stringLenCheck(description) : 'Description not found'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;