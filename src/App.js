import React, { Component } from 'react';
//material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//router
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
//components
import Login from './components/Login'
import AdminBoard from './components/AdminBoard'
import RebrandlyLinks from './components/links/RebrandlyLinks'
import CreateLinks from './components/links/CreateLinks'
import EditLinks from './components/links/EditLinks'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" render={() => (<Redirect to="/login" />)} />
            <Route path="/board" component={AdminBoard} />
            <Route exact path="/link" component={RebrandlyLinks}/>
            <Route path="/link/new" component={CreateLinks}/>
            <Route path="/link/:id/edit" component={EditLinks}/>

          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
