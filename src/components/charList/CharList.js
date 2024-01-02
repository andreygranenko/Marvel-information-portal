import './charList.scss';
import {Component} from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import marvelService from "../../services/MarvelService";

class CharList extends Component {

    static propTypes = {
        onCharSelected: PropTypes.func
    }


    state = {
        characters: [],
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
        // this.marvelService.getAllCharacters()
        //     .then(this.loadAllChar)
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.loadAllChar)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    loadAllChar = (res) => {
        const newCharacters = res.map(char => {
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
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({offset, characters}) => ({
            characters: [...characters, ...newCharacters],
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }
        ));
    }

    render() {
        const {characters, offset, newItemLoading, charEnded} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characters.map(item => item)}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}


export default CharList;