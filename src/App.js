import React, { Component } from 'react';
import MyNominations from './Components/Nominations/MyNominations';
import Search from './Components/Search/Search'
import './App.css';

class App extends Component {
	constructor(props) {
    super(props);
    
    let noms = [];
    if (localStorage.getItem('nominees')) {
      noms = JSON.parse(localStorage.getItem('nominees'));
    }

    this.state = {
      nominees: noms
    };
  }

  nominate = (movie) => {
    if (this.state.nominees.length < 5) {
      const noms = this.state.nominees.concat([movie]);

      this.setState({
        nominees: noms
      });

      localStorage.setItem('nominees', JSON.stringify(noms))
    }
  }

  removeNominee = (movie) => {
    const noms = this.state.nominees.filter(
      nom => nom.imdbID !== movie.imdbID
    );

    this.setState({
      nominees: noms
    });

    localStorage.setItem('nominees', JSON.stringify(noms))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="title-the"> The </p>
          <p className="title-annual"> 1st Annual </p>
          <p className="title-shoppies"> Shoppies </p>
        </header>
        <MyNominations nominees={this.state.nominees} removeNominee={this.removeNominee}/>
        <Search nominees={this.state.nominees} nominate={this.nominate}/>
      </div>
    );
  }
}

export default App;
