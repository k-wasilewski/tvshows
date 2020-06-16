import React from 'react';
import Router from './Router';
import {useStyles} from '../styles/styles';
import logo from '../img/logo.png';

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.App}>
            <img className={classes.logo} src={logo} />
            <Router />
            <p className={classes.copywright}> &copy; Kuba Wasilewski, 2020 </p>
        </div>
    );
};
