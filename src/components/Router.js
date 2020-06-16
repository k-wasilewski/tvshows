import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./landing-page/LandingPage";
import Details from "./details/Details";
import { useStyles } from "../styles/useStyles";

const Router = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Switch>
                <Route path={`/`} exact component={LandingPage} />
                <Route path={`/details`} exact component={Details} />
            </Switch>
            <p className={classes.copywright}> &copy; Kuba Wasilewski, 2020 </p>
        </React.Fragment>
    );
};

export default Router;