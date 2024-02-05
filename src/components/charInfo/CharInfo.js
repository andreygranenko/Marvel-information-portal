import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import './charInfo.scss';
import useMarvelService from "../../services/MarvelService";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [ini, setIn] = useState(true);

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId]);


    const updateChar = () => {
        setIn(false);
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }
    const onCharLoaded = (char) => {
        setChar(char);
        setIn(true);
    }



    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View ini={ini} char={char}/> : null;
    return (

            <div className="char__info">
                    {skeleton}
                    {content}
                    {errorMessage}
                    {spinner}
            </div>
    )

}

const View = ({char, ini}) => {
    const {onImageNotFound} = useMarvelService();
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = onImageNotFound(char);
    const newComics = (comics && comics.length > 10) ? comics.slice(0, 10) : ['There are no comics for character'];
    return (
            <div >
                <div className="char__basics">
                    <img style={imgStyle} src={thumbnail} alt={name} />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {newComics.map((item, i) => (
                        <li key={i} className="char__comics-item">
                            {item.name ? item.name : item}
                        </li>
                    ))}
                </ul>
            </div>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;