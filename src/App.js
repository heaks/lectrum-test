import React from 'react';
import Login from './Login';
import Registration from './Registration';
import CV from './CV';
import WelcomePage from './WelcomePage';
import ErrorPage from './ErrorPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';


const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/cv">CV</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cv">
          <CV />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route component={WelcomePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
