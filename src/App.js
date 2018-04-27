import React, { Component } from 'react';
//material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//componets

import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Login />
      </MuiThemeProvider>
    );
  }
}

export default App;
