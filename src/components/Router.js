import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
import Details from './details/Details';
import NotFoundComponent from "./error/NotFoundComponent";

const Router = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={`/`} exact component={LandingPage} />
                <Route path={`/details`} exact component={Details} />
                <Route path='*' exact={true} component={NotFoundComponent} />
            </Switch>
        </React.Fragment>
    );
};

export default Router;