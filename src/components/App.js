import React from 'react';
import Router from './Router';
import {styles} from '../styles/styles';
import logo from '../img/logo.png';
import {setDetailedResult} from '../redux/actions';
import {connect} from 'react-redux';

export function App(props) {
    const classes = styles();
    const [copyrightClassName, setCopyrightClassName] = React.useState(classes.copyrightDetails);

    React.useEffect( () => {
        if (copyrightClassName===classes.copyrightLandingPage)
            setCopyrightClassName(classes.copyrightDetails);
        else if (copyrightClassName===classes.copyrightDetails)
            setCopyrightClassName(classes.copyrightLandingPage);
    }, [props.detailedResult]);

    return (
        <div className={classes.App}>
            <img className={classes.logo} src={logo} alt='logo' />
            <Router />
            <p className={copyrightClassName}> &copy; Kuba Wasilewski, 2020 </p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        detailedResult: state.setDetailedResultReducer.detailedResult
    };
};

const mapDispatchToProps = {
    setDetailedResult
};

export default connect(mapStateToProps, mapDispatchToProps)(App);