import React, { Component } from 'react';
import './css/App.css';
import Search from './components/Search';
import Results from './components/Results';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Search />
            <Results />
        </div>
    );
  };
};

export default App;
