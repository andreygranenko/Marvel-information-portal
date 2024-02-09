import './charList.scss';
import {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";


import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

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


    const {getAllCharacters, onImageNotFound, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoad(false) : setItemLoad(true);
        getAllCharacters(offset)
            .then(loadAllChar)
            .then(() => setProcess('confirmed'));
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

    // const items = (
    //
    // )
        return (
            <div className="char__list">
                {setContent(process, () => (
                  <TransitionGroup component={'ul'} className={"char__grid"}>
                      {characters.map((item, i) => (
                        <CSSTransition
                          classNames={'char__item'}
                          timeout={300}
                          key={i}>
                            {item}
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                ), newItemLoading )}

                {/*<ul className="char__grid">*/}

                {/*</ul>*/}
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