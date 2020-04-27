import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import './App.css';
import InfoForm from './form';

createStore({
  data: {}
});


function App() {
  
  return (
    <StateMachineProvider>
      <Router>
        <Route exact path="/" component={InfoForm} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;
