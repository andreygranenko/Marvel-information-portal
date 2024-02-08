import {Link, useParams} from "react-router-dom";
import './singleCharacterPage.sass';

import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SingleCharacterPage = () => {
  const {charId} = useParams();
  const [character, setCharacter] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId)
      .then(onComicLoaded)
  }
  const onComicLoaded = (char) => {
    setCharacter(char);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !character) ? <View character={character}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

const View = ({character}) => {
  const {name, description, thumbnail} = character;
  return (
    <>
      <AppBanner/>
      <div className="single-char">
        <img src={thumbnail} alt={name} className="single-char__img"/>
        <div className="single-char__info">
          <h2 className="single-char__name">{name}</h2>
          <p className="single-char__descr">{description}</p>
        </div>
        <Link to={'/'} className="single-char__back" style={{display: 'block'}}>Back to all</Link>
      </div>
    </>
  );
};

export default SingleCharacterPage;