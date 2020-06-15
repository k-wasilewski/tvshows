import React, { Component } from 'react';
import '../css/App.css';
import {setResults} from "../redux/actions";
import {connect} from "react-redux";
import ResultsTable from "./ResultsTable";

class Results extends Component {
    render() {
        return (
            <div className="App">
                <ResultsTable results={this.props.results} />
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
