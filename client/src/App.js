import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import User from './components/User';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Switch, Route } from 'react-router-dom';
import Error from './components/Error';
import { initialState, reducer } from './reducer/UseReducer';
import Users from './components/Users';
import Logout from './components/Logout';

export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/developers" component={Users} />
          <Route exact path="/developer/:id" component={User} />
          <Route exact path="/logout" component={Logout} />
          <Route component={Error} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
