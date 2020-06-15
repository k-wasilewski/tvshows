import React, { Component } from 'react';
import '../css/App.css';
import Search from './Search';
import Results from './Results';

class LandingPage extends Component {
    render() {
        return (
            <div className="App">
                <Search />
                <Results />
            </div>
        );
    };
};

export default LandingPage;
