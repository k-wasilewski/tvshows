import React from 'react';
import Router from './Router';
import {styles} from '../styles/styles';
import logo from '../img/logo.png';
import {setDetailedResult, setOriginalImage} from '../redux/actions';
import {connect} from 'react-redux';
import OriginalImg from "./details/OriginalImage";
import Typography from "@material-ui/core/Typography";

export function App(props) {
    const classes = styles();
    const [copyrightClassName, setCopyrightClassName] = React.useState(classes.copyrightDetails);

    React.useEffect( () => {
        if (copyrightClassName===classes.copyrightLandingPage)
            setCopyrightClassName(classes.copyrightDetails);
        else if (copyrightClassName===classes.copyrightDetails)
            setCopyrightClassName(classes.copyrightLandingPage);
    }, [props.detailedResult]);     //eslint-disable-line react-hooks/exhaustive-deps

    function gotCallbackFromImg() {
        props.setOriginalImage('', '');
    }

    return (
        <React.Fragment>
            <OriginalImg notifyParent={gotCallbackFromImg} />
            <div id='App' className={(props.img==='') ? classes.App : classes.blurApp}>
                <img className={classes.logo} src={logo} alt='logo' />
                <Router />
                <Typography id='copyright' variant="h6" component="h2" className={copyrightClassName}>
                    &copy; Kuba Wasilewski, 2020
                </Typography>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        detailedResult: state.setDetailedResultReducer.detailedResult,
        img: state.setOriginalImageReducer.src
    };
};

const mapDispatchToProps = {
    setDetailedResult,
    setOriginalImage
};

export default connect(mapStateToProps, mapDispatchToProps)(App);