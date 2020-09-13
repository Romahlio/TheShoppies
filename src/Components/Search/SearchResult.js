import React, { Component } from 'react';
import './Search.css'

class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nominated: false,
            info: this.props.info
        };
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.nominate({...this.state.info});
    }

    render () {
        return (
            <div className="movie" onClick={this.handleClick}>
                <p> {this.state.info.Title} </p>
                <p> ({this.state.info.Year}) </p>
            </div>
        );
    }
}

export default SearchResult;