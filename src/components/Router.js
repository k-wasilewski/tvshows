import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import Details from "./Details";

const Router = () => {
    return (
        <div className='router'>
            <Switch>
                <Route path={`/`} exact component={LandingPage} />
                <Route path={`/details`} exact component={Details} />
            </Switch>
            <p id='copyright'> &copy; Kuba Wasilewski, 2020 </p>
        </div>
    );
};

export default Router;