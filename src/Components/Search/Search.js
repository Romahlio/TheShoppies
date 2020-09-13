import React, { Component } from 'react';
import SearchResult from "./SearchResult";
import './Search.css';

const url = "http://www.omdbapi.com/"
const APIkey = "&type=movie&apikey=ed46aeea"

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: false,
            results: [],
            search: "",
            searchTimeout: 0,
            nominees: this.props.nominees
        };
    }

    sendSearchRequest = (search) => {
        if (search === "") {
            this.setState({
                loading: false,
                results: [],
                error: null
            });
            return;
        }
        
        let api = url + "?s=" + search + APIkey

        fetch(api)
        .then(res => res.json())
        .then(
            (res) => {
                if (res.Search) {
                    this.setState({
                        loading: false,
                        results: res.Search,
                        error: null
                    });
                } else if (res.Response && res.Response === "False") {
                    this.setState({
                        loading: false,
                        results: [],
                        error: res.Error
                    });
                }
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: error.message
                });
            }
        );
    }

    handleSearch = (e) => {
        const self = this;
        var searchText = e.target.value

        if (self.state.searchTimeout) {
            clearTimeout(self.state.searchTimeout);
        }

        self.setState({
            loading: true,
            search: searchText,
            searchTimeout: setTimeout(function () {
                self.sendSearchRequest(searchText);
            }, 600)
        });
    }

    nominate = (movie) => {
        this.props.nominate(movie);
    }

    render() {
        const searchBar = (
            <div>
                <p> Search for a movie </p>
                <input className="search-bar"
                    type="text"
                    placeholder="Enter a movie title"
                    onChange={this.handleSearch}>
                </input>
            </div>
        );

        let results = [];
        if (this.state.results.length !== 0) {
            let movies = this.state.results;

            for (let i = 0; i < movies.length; i++) {
                results.push(
                    <React.Fragment key={i}>
                        <SearchResult info={movies[i]} nominate={this.nominate}/>
                    </React.Fragment>
                );
            }
        }

        return (
            <div className="search-results">
                {searchBar}
                <div >
                    <p> Results for "{this.state.search}"</p>
                    {results}
                </div>
            </div>
        );
    }
}

export default Search;