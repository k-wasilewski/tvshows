import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setResults } from '../../../redux/actions';
import {SearchForm} from "./SearchForm";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            errorMsg: '',
            inputRef: null
        };

        this.inputOnChange = this.inputOnChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.getInputRefFromChild = this.getInputRefFromChild.bind(this);
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

    resetResults = (event) => {
        const inputNode = this.state.inputRef;
        inputNode.value = '';
        this.setState({input: ''});
        this.props.setResults([]);
        event.preventDefault();
    }

    getInputRefFromChild = (inputRef) => {
        this.setState({inputRef: inputRef.current});
    }

    render() {
        return (
            <SearchForm msg={this.state.errorMsg} onSubmit={this.submitQuery}
                        onChange={this.inputOnChange} doReset={this.resetResults}
                        passInputRefToParent={this.getInputRefFromChild} />
        );
    };
};

const mapDispatchToProps = {
    setResults
};

export default connect(null, mapDispatchToProps)(Search);
