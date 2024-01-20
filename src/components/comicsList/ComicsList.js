import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setItemLoad] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnd] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoad(false) : setItemLoad(true);
        getAllComics()
            .then(loadAllComics)
    }

    const loadAllComics = res => {
        const newComics = res.map(comics => {
            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={comics.id}>
                    <a href={comics.url}>
                        <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </a>
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