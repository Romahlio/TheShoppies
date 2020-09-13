import React, { Component } from 'react';
import './Nominations.css';

class Nominee extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.removeNominee(this.props.info);
    }

    render () {
        const info = this.props.info;

        let nominee = (
            <div className="empty-nominee"> empty </div>
        );

        if (info !== undefined && info !== null) {
            nominee = (
                <div className="nominee" onClick={this.handleClick}>
                    <p> {this.props.info.Title} </p>
                    <p> ({this.props.info.Year}) </p>
                </div>
            );
        }

        return nominee;
    }
}

export default Nominee;