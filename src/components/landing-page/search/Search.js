import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setResults } from '../../../redux/actions';
import {ErrorMsg} from '../../misc/ErrorMsg';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            errorMsg: ''
        };

        this.inputOnChange = this.inputOnChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
    }

    inputOnChange = (event) => {
        this.setState({input: event.target.value});
    }

    submitQuery = (event) => {
        const query = this.state.input;

        axios.get(`http://api.tvmaze.com/search/shows?q=${query}`
        ).then(resp => {
            if (query==='') {
                this.setState({
                    errorMsg: 'Pole nie może być puste'
                });
            } else if (resp.data.length===0) {
                this.setState({
                    errorMsg: 'Nic nie znaleziono'
                });
            } else {
                this.props.setResults(resp.data);
                this.setState({
                    errorMsg: ''
                });
            }
        }).catch(error => {
            this.setState({
                errorMsg: 'Błąd serwera'
            });
        });

        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <ErrorMsg msg={this.state.errorMsg} />
                <form onSubmit={this.submitQuery}>
                    <input type='text' onChange={this.inputOnChange} />
                    <button>Szukaj</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
