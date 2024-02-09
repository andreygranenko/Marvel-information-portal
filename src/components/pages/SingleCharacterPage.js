import {Link, useParams} from "react-router-dom";
import './singleCharacterPage.sass';

import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import {Helmet} from "react-helmet";
import setContent from "../../utils/setContent";

const SingleCharacterPage = () => {
  const {charId} = useParams();
  const [character, setCharacter] = useState(null);
  const {getCharacter, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId)
      .then(onComicLoaded)
      .then(() => setProcess('confirmed'));
  }
  const onComicLoaded = (char) => {
    setCharacter(char);
  }


  return (
    <>
      {setContent(process, View, character)}
    </>
  );
}

const View = ({data}) => {
  const {name, description, thumbnail} = data;
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Character page"
        />
        <title>{name} character page</title>
      </Helmet>
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