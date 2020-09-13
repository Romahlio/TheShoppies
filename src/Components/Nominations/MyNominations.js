import React, { Component } from 'react';
import Nominee from './Nominee';
import './Nominations.css'

class MyNominations extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let nominees = [];
        for(let i = 0; i < 5; i++) {
            if (i < this.props.nominees.length) {
                nominees.push(
                    <React.Fragment key={i}>
                        <Nominee
                            info={this.props.nominees[i]}
                            removeNominee={this.props.removeNominee}
                        />
                    </React.Fragment>
                );
            } else {
                nominees.push(
                    <React.Fragment key={i}>
                        <Nominee info={null} />
                    </React.Fragment>
                );
            }
        }

        return (
            <div>
                <p> My Nominations </p>
                <div className="nominations">
                    {nominees}
                </div>
            </div>
        );
    }
}

export default MyNominations;