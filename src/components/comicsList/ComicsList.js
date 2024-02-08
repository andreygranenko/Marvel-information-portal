import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setItemLoad] = useState(false);
    const [offset, setOffset] = useState(50);
    const [comicsEnded, setComicsEnd] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoad(false) : setItemLoad(true);
        getAllComics(offset)
            .then(loadAllComics)
    }

    const loadAllComics = res => {
        const newComics = res.map((comics, i) => {
            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={i}>
                    <Link to={`/comics/${comics.id}`}>
                        <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </Link>
                </li>
            )
        });
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, newComics]);
        setItemLoad(false);
        setOffset(offset => offset + 8);
        setComicsEnd(ended);
        console.log(offset);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    console.log('test');
    return (
        <div className="comics__list">
            {spinner}
            <ul className="comics__grid">
                {comics.map(item => item)}
                {errorMessage}

            </ul>
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;