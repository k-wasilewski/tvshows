import React, { Component } from 'react';
import {setResults} from "../redux/actions";
import {connect} from "react-redux";
import ResultsTable from "./ResultsTable";
import ResultsFilter from "./ResultsFilter";
import mapDayNoToName from "../functions/mapDayNoToName";

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredResults: []
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.filteredResults===prevState.filteredResults)
            this.setState({filteredResults: []});
    }

    filterByDay = (day) => {
        const dayName = mapDayNoToName(day);

        const filteredResults = this.props.results.filter(result =>
            result.show.schedule.days.includes(dayName)
        );

        this.setState({filteredResults: filteredResults});
    }

    render() {
        const results = (this.state.filteredResults.length===0) ?
            this.props.results
            :
            this.state.filteredResults;

        return (
            <React.Fragment>
                <ResultsFilter setDay={this.filterByDay} />
                <ResultsTable results={results} />
            </React.Fragment>
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
