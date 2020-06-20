import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
import Details from './details/Details';
import ErrorComponent from "./error/ErrorComponent";

const Router = () => {

    return (
        <React.Fragment>
            <Switch>
                <Route path={`/`} exact render={() => <LandingPage />} />
                <Route path={`/details`} exact render={() => <Details />} />
                <Route exact render={() => <ErrorComponent msg='Nie znaleziono strony'/>} />
            </Switch>
        </React.Fragment>
    );
};

export default Router;