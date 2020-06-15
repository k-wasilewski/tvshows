import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';

class LandingPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Search />
                <Results />
            </React.Fragment>
        );
    };
};

export default LandingPage;
