import './charList.scss';
import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";


import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

const CharList = (props) => {

    const propTypes = {
        onCharSelected: PropTypes.func
    }

    // myRef = React.createRef()

    const refsObj = useRef({});
    const [characters, setChar] = useState([]);
    const [newItemLoading, setItemLoad] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnd] = useState(false);


    const {loading, error, getAllCharacters, onImageNotFound} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoad(false) : setItemLoad(true);
        getAllCharacters(offset)
            .then(loadAllChar)
    }



    const setRef = elem => {
        // const myRef = elem;
        if (elem) {
            refsObj.current[elem.textContent] = elem;
        }
    }


    const focusItem = (name) => {
        Object.keys(refsObj.current).forEach(item => {
            let clazz = refsObj.current[item].className;
            if (clazz.indexOf('char__item_selected') !== -1) {
                refsObj.current[item].className = clazz.slice(0, clazz.indexOf('char__item_selected'));
            }
        })
        refsObj.current[name].className += ' char__item_selected';
    }

    const loadAllChar =  (res) => {

        const newCharacters = res.map((char, i) => {
            const imgStyle = onImageNotFound(char);
            return (
                <li className="char__item"
                    tabIndex={0}
                    ref={setRef}
                    key={i}
                    onClick={() => {
                        props.onCharSelected(char.id);
                        focusItem(char.name);
                    }}>
                    <img style={imgStyle} src={char.thumbnail} alt="abyss"/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        });
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }


        setChar(characters => [...characters, ...newCharacters]);
        setItemLoad(false);
        setOffset(offset => offset + 9);
        setCharEnd(ended);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading  && !newItemLoading ? <Spinner/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {characters.map(item => item)}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

}


export default CharList;