import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import './App.css';
import InfoForm from './form';
import Result from './result';

createStore({
  data: {}
});


function App() {
  
  return (
    <StateMachineProvider>
      <Router>
        <Route exact path="/" component={InfoForm} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;
