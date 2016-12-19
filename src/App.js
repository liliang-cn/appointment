import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import AddForm from './components/AddForm';
import Search from './components/Search';
import AptList from './components/AptList';

const paperStyle = {
  minHeight: 600,
  width: 360,
  margin: '20px auto',
  textAlign: 'center'
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      apts: [
        {
          guestName: 'John Doe',
          date: '2016-12-19',
          time: '8:48 pm',
          note: 'Somthing important'
        }
      ]
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="React Redux Appointment"
            showMenuIconButton={false}
          />
          <Paper style={paperStyle} zDepth={5}>
            <AddForm />
            <Search />
            <AptList apts={this.state.apts} />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
