import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import marvelService from "../../services/MarvelService";

class CharList extends Component {

    state = {
        characters: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.loadAllChar)
    }

    loadAllChar = (res) => {
        const characters = res.map(char => {
            const imgStyle = marvelService.onImageNotFound(char);
            return (
                <li className="char__item"
                    key={char.id}
                    onClick={() => this.props.onCharSelected(char.id)}>
                    <img style={imgStyle} src={char.thumbnail} alt="abyss"/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        });

        this.setState({characters});
    }

    render() {
        const {characters} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characters}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}

export default CharList;