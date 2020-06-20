import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
import Details from './details/Details';
import ErrorComponent from "./error/ErrorComponent";

const Router = () => {
    throw new Error('my error')
    return (
        <React.Fragment>
            <Switch>
                <Route path={`/`} exact render={() => <LandingPage />} />
                <Route path={`/details`} exact render={() => <Details />} />
                <Route path='*' exact render={() => <ErrorComponent msg='Nie znaleziono strony'/>} />
            </Switch>
        </React.Fragment>
    );
};

export default Router;