import React from 'react';
import Search from './search/Search';
import Results from './results/Results';

export default function LandingPage() {
    return (
        <React.Fragment>
            <Search />
            <Results />
        </React.Fragment>
    );
};
