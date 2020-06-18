import React from 'react';
import {connect} from 'react-redux';
import ResultsTable from './ResultsTable';
import ResultsFilter from './ResultsFilter';
import mapDayNoToName from '../../../functions/mapDayNoToName';

export class Results extends React.Component {
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

    filterByDay(day) {
        const dayName = mapDayNoToName(day);

        const filteredResults = this.props.results.filter(result =>
            result.show.schedule.days.includes(dayName)
        );

        this.setState({filteredResults: filteredResults});
    }

    resetFilter = () => {
        this.setState({filteredResults: this.props.results});
    }

    render() {
        const results = (this.state.filteredResults.length===0) ?
            this.props.results
            :
            this.state.filteredResults;

        const resultsFilter = (results.length===0) ?
            null
            :
            <ResultsFilter setDay={this.filterByDay} doReset={this.resetFilter} />;

        return (
            <React.Fragment>
                {resultsFilter}
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

export default connect(mapStateToProps, null)(Results);
