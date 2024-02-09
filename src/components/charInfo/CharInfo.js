import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import './charInfo.scss';
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();
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
            .then(() => setProcess('confirmed'));
    }
    const onCharLoaded = (char) => {
        setChar(char);
        setIn(true);
    }



    return (
            <div className="char__info">
                    {setContent(process, View, char)}
            </div>
    )

}

const View = ({data}) => {
    const {onImageNotFound} = useMarvelService();
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const imgStyle = onImageNotFound(data);
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