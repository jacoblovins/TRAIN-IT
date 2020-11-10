import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Classify from './pages/Classify';
import Collect from './pages/Collect';


function App() {
  
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Collect and Train Your Data</Link>
              </li>
              <li>
                <Link to="/classify">Try It Out!</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/classify">
              <Classify />
            </Route>
            <Route path="/">
              <Collect />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
