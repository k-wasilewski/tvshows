import React from 'react';
import Router from "./components/Router";
import {useStyles} from "./components/useStyles";

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.App}>
            <Router />
        </div>
    );
};
