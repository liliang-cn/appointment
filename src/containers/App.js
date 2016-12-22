import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import AddForm from '../containers/AddForm';
import Search from '../components/Search';
import Sort from '../components/Sort';
import AptList from '../components/AptList';

import { deleteApt, query, changeOrderBy, changeOrderDir } from '../actions';

const paperStyle = {
  minHeight: 600,
  width: 360,
  margin: '20px auto',
  textAlign: 'center'
};

const App = ({
  apts, 
  dispatch, 
  orderBy, 
  orderDir,
  handleSearch,
  handleDelete,
  handleOrderByChange,
  handleOrderDirChange
}) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="React Redux Appointment"
        showMenuIconButton={false}
      />
      <Paper style={paperStyle} zDepth={5}>
        <AddForm />
        <Search handleSearch={handleSearch}/>
        <Sort 
          orderBy={orderBy} 
          orderDir={orderDir}
          handleOrderByChange={handleOrderByChange}
          handleOrderDirChange={handleOrderDirChange}
        />
        <AptList 
          apts={apts} 
          handleDelete={handleDelete} 
        />
      </Paper>
    </div>
  </MuiThemeProvider>
);

const handledApts = (apts, query, orderBy, orderDir) => {
    const filterArr = (arr, query) => {
        return arr.filter(item => (
            item.guestName.toLowerCase().indexOf(query) !== -1 || 
            item.date.indexOf(query) !== -1 || 
            item.time.indexOf(query) !== -1 ||
            item.note.toLowerCase().indexOf(query) !== -1)
        );
    };

    const sortArr = (arr, orderBy, orderDir) => {
      if (orderBy && orderDir) {
        return arr.sort((apt1, apt2) => {
          const value1 = apt1[orderBy].toString().toLowerCase();
          const value2 = apt2[orderBy].toString().toLowerCase();
            if (value1 < value2) {
                return orderDir === 'asc' ? -1 : 1;
            } else if (value1 > value2) {
                return orderDir === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        })
      } else {
        return arr;
      }
    };

    if (!query) {
      return sortArr(apts, orderBy, orderDir);
    } else {
      return sortArr(filterArr(apts, query), orderBy, orderDir);
    }
};

const mapStateToProps = (state) => ({
    query: state.query,
    orderBy: state.orderBy,
    orderDir: state.orderDir,
    apts: handledApts(state.apts, state.query, state.orderBy, state.orderDir),
});

const mapDispatchToProps = ({
    handleSearch: searchText => query(searchText),
    handleDelete: id => deleteApt(id),
    handleOrderByChange: orderBy => changeOrderBy(orderBy),
    handleOrderDirChange: orderDir => changeOrderDir(orderDir)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
