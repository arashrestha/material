import React, { Component } from 'react';
//material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//router
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//components
import Login from './components/Login'
import AdminBoard from './components/AdminBoard'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" render={() => (<Redirect to="/login" />)} />
            <Route path="/board" component={AdminBoard} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
