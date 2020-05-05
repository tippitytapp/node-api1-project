import React from 'react';
import {Route} from "react-router-dom";


import UserList from "./components/UserList"
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Users Database</h1>
      <Route path="/"><UserList /></Route>

    </div>
  );
}

export default App;
