import React, { Component } from 'react';
import '../css/App.css';
import {setResults} from "../redux/actions";
import {connect} from "react-redux";

class Results extends Component {
    render() {
        const results = (this.props.results.length===0) ?
            ''
            :
            JSON.stringify(this.props.results);

        return (
            <div className="App">
                {results}
            </div>
        );
    };
};

function mapStateToProps(state) {
    return {
        results: state.setResultsReducer.results,
    };
};

const mapDispatchToProps = {
    setResults
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
