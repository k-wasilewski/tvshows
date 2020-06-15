import React, { Component } from 'react';
import '../css/App.css';
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

    filterByDay = (day) => {
        const dayName = mapDayNoToName(day);

        const filteredResults = this.props.results.filter(result =>
            result.show.schedule.days.includes(dayName)
        );

        this.setState({filteredResults: filteredResults});
    }

    render() {
        return (
            <div className="App">
                <ResultsFilter setDay={this.filterByDay} />
                <ResultsTable results={(this.state.filteredResults.length===0) ?
                    this.props.results
                    :
                    this.state.filteredResults} />
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
