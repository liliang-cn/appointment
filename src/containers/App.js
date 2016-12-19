import React, { Component } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import AddForm from '../components/AddForm';
import Search from '../components/Search';
import AptList from '../components/AptList';

import { addApt, deleteApt } from '../actions';

const paperStyle = {
  minHeight: 600,
  width: 360,
  margin: '20px auto',
  textAlign: 'center'
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="React Redux Appointment"
            showMenuIconButton={false}
          />
          <Paper style={paperStyle} zDepth={5}>
            <AddForm handleAdd={newApt => this.props.dispatch(addApt(newApt))} />
            <Search />
            <AptList apts={this.props.apts} handleDelete={id => this.props.dispatch(deleteApt(id))} />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  apts: state.apts
});

export default connect(mapStateToProps, null)(App);
