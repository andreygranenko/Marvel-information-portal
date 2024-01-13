import './charList.scss';
import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import marvelService from "../../services/MarvelService";

const CharList = (props) => {

    const propTypes = {
        onCharSelected: PropTypes.func
    }

    // myRef = React.createRef()

    const refsObj = {};

    const [characters, setChar] = useState([]);
    const [newItemLoading, setItemLoad] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnd] = useState(false);


    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(loadAllChar)
    }

    const onCharListLoading = () => {
        setItemLoad(true);
    }


    const setRef = elem => {
        // const myRef = elem;
        refsObj[elem.textContent] = elem;
        console.dir(refsObj);
        console.log(elem.textContent)
    }

    const focusItem = (name) => {
        Object.keys(refsObj).forEach(item => {
            let clazz = refsObj[item].className;
            if (clazz.indexOf('char__item_selected') !== -1) {
                refsObj[item].className = clazz.slice(0, clazz.indexOf('char__item_selected'));
            }
        })
        refsObj[name].className += ' char__item_selected';
    }

    const loadAllChar = (res) => {
        const newCharacters = res.map(char => {
            const imgStyle = marvelService.onImageNotFound(char);
            return (
                <li className="char__item"
                    ref={setRef}
                    key={char.id}
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


    return (
        <div className="char__list">
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