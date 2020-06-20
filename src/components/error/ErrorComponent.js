import React from 'react';
import {styles} from "../../styles/styles";
import {useHistory} from 'react-router-dom';
import {ErrorMsg} from './ErrorMsg';
import Button from '@material-ui/core/Button';
import logo from "../../img/logo.png";
import Typography from "@material-ui/core/Typography";

export function ErrorComponent(props) {
    const history = useHistory();
    const classes = styles();

    if (props.msg==='Należy wybrać element z listy' ||
        props.msg==='Nie znaleziono strony') return (
        <div className={classes.dashboard}>
                <ErrorMsg msg={props.msg} />
                <Button variant='outlined' size='small' onClick={() => history.push('/')}>
                    Powrót</Button>
        </div>
    );
    else return (
        <div className={classes.App}>
            <div className={classes.dashboard}>
                <ErrorMsg msg={props.msg} />
                <img className={classes.logo} src={logo} alt='logo' />
                <Button disabled={true} size='small' onClick={() => history.push('/')}>
                    Odśwież stronę</Button>
                <Typography id='copyright' variant="h6" component="h2"
                            className={classes.copyrightLandingPage}>
                    &copy; Kuba Wasilewski, 2020
                </Typography>
            </div>
        </div>
    );
};

export default ErrorComponent;
