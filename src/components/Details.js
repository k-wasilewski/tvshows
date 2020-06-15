import React, { Component } from 'react';
import '../css/App.css';
import {setDetailedResult} from "../redux/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Details extends Component {

    createMarkup = (text) => {
        return {
            __html: text
        };
    };

    render() {
        const result = this.props.detailedResult;

        if (result.length===0) {
            return (<div className='errorMsg'>Należy wybrać element z listy</div>)
        } else {
            return (
                <div className="App">
                    <h2>{result.show.name}</h2>
                    <span dangerouslySetInnerHTML={this.createMarkup(result.show.summary)} />
                    <div><img alt={`img-${result.show.name}`} src={result.show.image.medium} /></div>
                    <Link to="/"><button>Powrót</button></Link>
                </div>
            );
        }
    };
};

function mapStateToProps(state) {
    return {
        detailedResult: state.setDetailedResultReducer.detailedResult
    };
};

const mapDispatchToProps = {
    setDetailedResult
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
