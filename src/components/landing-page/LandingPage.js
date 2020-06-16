import React, { Component } from 'react';
import Search from './search/Search';
import Results from './results/Results';

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
