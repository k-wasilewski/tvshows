import React, { Component } from 'react';
import './css/App.css';
import Router from "./components/Router";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Router />
        </div>
    );
  };
};

export default App;
