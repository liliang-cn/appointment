# React-Redux-Appointment

这个小应用使用[Create React App](https://github.com/facebookincubator/create-react-app)创建,
演示地址:[https://liliang-cn.github.io/appointment](https://liliang-cn.github.io/appointment)，
repo地址：[https://github.com/liliang-cn/appointment](https://github.com/liliang-cn/appointment)。

这是之前的[React_appointment](https://github.com/liliang-cn/react_appointment)的Redux版，
[之前的演示](https://quiet-falls-10277.herokuapp.com/)，
改写自Lynda的课程[Building a Web Interface with React.js](https://www.lynda.com/React-js-tutorials/Welcome/495271/511713-4.html?srchtrk=index%3a0%0alinktypeid%3a2%0aq%3aBuilding+a+Web+Interface+with+React.js%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2)。

## 文件结构

最终的文件目录如下:

```
react_redux_appointment/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions/
      index.js
    components/
      AddForm.js
      AptList.js
      Search.js
      Sort.js
    constants/
      index.js
    containers/
      AddForm.js
      App.js
    reducers/
      apts.js
      formExpanded.js
      index.js
      openDialog.js
      orderBy.js
      orderDir.js
      query.js
    index.css
    index.js
```

## 用到的模块

```json
{
  "name": "react_redux_appointment",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://liliang-cn.github.io/react_redux_appointment",
  "devDependencies": {
    "react-scripts": "0.8.4"
  },
  "dependencies": {
    "axios": "^0.15.3",
    "gh-pages": "^0.12.0",
    "lodash": "^4.17.2",
    "material-ui": "^0.16.5",
    "moment": "^2.17.1",
    "react": "^15.4.1",
    "react-dom": "^15.4.1",
    "react-redux": "^5.0.1",
    "react-tap-event-plugin": "^2.0.1",
    "redux": "^3.6.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "yarn build && gh-pages -d build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}

```

## 所有的state

小应用一共有六个状态，其中的formExpanded和openDialog是界面组件的状态，
剩下的四个分别是apts(代表所有的预约)、orderBy(根据什么来排列预约列表，根据姓名还是根据日期)、
orderDir(排列列表的方向，是增序还是降序)、query(搜索的关键字)。

## 所有的Action

在应用中可能产生的actions有七种：

- addApt，即新建预约
- deleteApt， 即删除预约
- toggleDialog， 即显示、隐藏警告框
- toggleFormExpanded, 显示/隐藏表单
- query，即查询
- changeOrderBy，即改变排序的关键字
- changeOrderDir, 即改变排序方向

定义七个常量来代表这些action的类型：

`constants/index.js`:

```javascript
export const ADD_APT = 'ADD_APT';

export const DELETE_APT = 'DELETE_APT';

export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

export const TOGGLE_FORM_EXPANDED = 'TOGGLE_FORM_EXPANDED';

export const QUERY = 'QUERY';

export const CHANGE_ORDER_BY = 'CHANGE_ORDER_BY';

export const CHANGE_ORDER_DIR = 'CHANGE_ORDER_DIR';

```

`actions/index.js`:

```javascript

import {
    ADD_APT,
    DELETE_APT,
    TOGGLE_DIALOG,
    TOGGLE_FORM_EXPANDED,
    QUERY,
    CHANGE_ORDER_BY,
    CHANGE_ORDER_DIR
} from '../constants';

export const addApt = (apt) => ({
    type: ADD_APT,
    apt
});

export const deleteApt = (id) => ({
    type: DELETE_APT,
    id
});

export const toggleDialog = () => ({
    type: TOGGLE_DIALOG
});

export const toggleFormExpanded = () => ({
    type: TOGGLE_FORM_EXPANDED
});

export const query = (query) => ({
    type: QUERY,
    query
});

export const changeOrderBy = (orderBy) => ({
    type: CHANGE_ORDER_BY,
    orderBy
});

export const changeOrderDir = (orderDir) => ({
    type: CHANGE_ORDER_DIR,
    orderDir
});
```

## UI组件

### 样式

使用Material-UI需要引入Roboto字体：

`src/index.css`

```css
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
body {
  margin: 0;
  padding: 0;
  font-family: Roboto, sans-serif;
}
```

### 表单组件

`components/addForm.js`:

```javascript
import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';

const paperStyle = {
  width: 340,
  margin: '0 auto 20px',
  textAlign: 'center'
};

const buttonStyle = {
    margin: 12
};

// open, toggleDialog是两个布尔值，handleAdd，formExpanded, toggleFormExpanded是三个回调函数，来自于../containers/AddForm.js中的容器从store中获取并传递下来的
const AddForm = ({handleAdd, open, toggleDialog, formExpanded, toggleFormExpanded}) => {
    let guestName, date, time, note;
    // 点击Add时会先首先检查是否所有的值都有输入，如果输入合法则发起ADD_APT的action然后发起切换表单显示的action，如果输入有误则发起TOGGLE_DIALOG的action
    const onAdd = () => {
        guestName && date && time && note
        ?
        handleAdd({guestName, date, time, note}) && toggleFormExpanded()
        :
        toggleDialog()
    };

    // 这两个函数用来获取输入的日期和时间
    const handleDateChange = (event, aptDate) => {
        date = moment(aptDate).format('YYYY-MM-DD')
    };

    const handleTimeChange = (event, aptTime) => {
        time = moment(aptTime).format('hh:mm')
    };

    const actions = [
        <FlatButton
            label="OK"
            primary={true}
            onTouchTap={toggleDialog}
        />
    ];

    return (
        <Paper style={paperStyle} zDepth={2}>
            // Card组件的expanded的值是一个布尔值，来自于父组件传下来的formExpanded，即应用的状态formExpanded，用来确定是否显示表单
            <Card style={{textAlign: 'left'}} expanded={formExpanded} onExpandChange={toggleFormExpanded}>
                <CardHeader
                    title="New Appointment"
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <TextField
                        floatingLabelText="Guest's Name"
                        underlineShow={false}
                        onChange={e => guestName = e.target.value.trim()}
                    />
                    <Divider />
                    <DatePicker
                        hintText="Date"
                        underlineShow={false}
                        onChange={handleDateChange}
                    />
                    <Divider />
                    <TimePicker
                        hintText="Time"
                        okLabel="OK"
                        cancelLabel="Cancel"
                        underlineShow={false}
                        onChange={handleTimeChange}
                    />
                    <Divider />
                    <TextField
                        floatingLabelText="Note"
                        underlineShow={false}
                        onChange={e => note = e.target.value.trim()}
                    />
                    <Divider />
                    <RaisedButton label="Add" primary={true} style={buttonStyle} onClick={onAdd}/>
                    <RaisedButton label="Cancel" secondary={true} style={buttonStyle} onClick={toggleFormExpanded}/>
                </CardText>
                // Dialog组件的open的值也是一个布尔值，来自于父组件传下来的open，即应用的状态openDialog，用来验证表单
                <Dialog
                    title="Caution"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={toggleDialog}
                >
                    All fileds are required!
                </Dialog>
            </Card>
        </Paper>
    );
};

export default AddForm;

```

### 搜索表单

`components/Search.js`:

```javascript
import React from 'react';
import TextField from 'material-ui/TextField';

const Search = ({handleSearch}) => {
    return (
        <div>
            <TextField
                hintText="Search"
                onChange={
                    e => handleSearch(e.target.value)
                }
            />
        </div>
    );
};

export default Search;
```

### 排列选择

`components/Sort.js`:

```javascript
import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'

const Sort = ({
    orderBy,
    orderDir,
    handleOrderByChange,
    handleOrderDirChange
}) => {
    return (
        <div>
            <SelectField
                floatingLabelText="Order By"
                value={orderBy}
                style={{textAlign: 'left'}}
                onChange={(event, index, value) => {handleOrderByChange(value)}}
            >
                <MenuItem value='guestName' primaryText="Guest's name" />
                <MenuItem value='date' primaryText="Date" />
            </SelectField>

            <SelectField
                floatingLabelText="Order Direction"
                value={orderDir}
                style={{textAlign: 'left'}}
                onChange={(event, index, value) => {handleOrderDirChange(value)}}
            >
                <MenuItem value='asc' primaryText="Ascending" />
                <MenuItem value='desc' primaryText="Descending" />
            </SelectField>
        </div>
    );
};

export default Sort;
```

### 预约列表

这个组件的作用就是显示预约列表，接受父组件传来的apts数组和handleDelete函数，在点击RaisedButton的时候将apt.id传入handleDelete并执行。

`components/AptList.js`:

```javascript
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
    width: '60%',
    margin: '12px 20%',
};

const AptList = ({apts, handleDelete}) => {
    return (
        <div>
            <h2>Appointments List</h2>
            <List>
                // 这里的i也可以直接用apt.id
                {apts.map((apt, i) => (
                    <ListItem key={i}>
                        <Card style={{textAlign: 'left'}}>
                            <CardHeader
                                title={apt.date}
                                subtitle={apt.time}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardTitle title={apt.guestName}/>
                            <CardText expandable={true}>
                                {apt.note}
                                <CardActions>
                                    <RaisedButton
                                        style={buttonStyle}
                                        label="Delete"
                                        secondary={true}
                                        onClick={() => handleDelete(apt.id)}
                                    />
                                </CardActions>
                            </CardText>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default AptList;
```

## 处理不同的actions

### 处理表单的显示和隐藏

`reducers/formExpanded.js`:

```javascript
import { TOGGLE_FORM_EXPANDED } from '../constants';

// formExpanded默认为false，即不显示，当发起类型为TOGGLE_FORM_EXPANDED的action的时候，将状态切换为true或者false
const formExpanded = (state=false, action) => {
    switch (action.type) {
        case TOGGLE_FORM_EXPANDED:
            return !state;
        default:
            return state;
    }
};

export default formExpanded;
```

### 表单验证错误的提示对话框

`reducers/openDialog.js`:

```javascript
import { TOGGLE_DIALOG } from '../constants';

// 这个action是由其他action引发的
const openDialog = (state=false, action) => {
    switch (action.type) {
        case TOGGLE_DIALOG:
            return !state;
        default:
            return state;
    }
};

export default openDialog;
```

### 处理新建预约和删除预约

`reducers/apts.js`:

```javascript
import { ADD_APT, DELETE_APT } from '../constants';

// 用唯一的id来标识不同的预约，也可以直接用时间戳new Date()
let id = 0;

// 根据传入的数组和id来执行删除操作
const apts = (state=[], action) => {
    const handleDelete = (arr, id) => {
        for(let i=0; i<arr.length; i++) {
            if (arr[i].id === id) {
                return [
                    ...arr.slice(0, i),
                    ...arr.slice(i+1)
                ]
            }
        }
    };

    switch (action.type) {
        // 根据action传入的数据apt再加上id来生成一个新的预约
        case ADD_APT:
            return [
                ...state,
                Object.assign({}, action.apt, {
                    id: ++id
                })
            ]
        case DELETE_APT:
            return handleDelete(state, action.id);
        default:
            return state;
    }
};

export default apts;
```

### 查询和排列方式

这三个函数的作用就是根据action传入的数据，更新state里的对应值，在这里并不会真正的去处理预约的列表。

`reducers/orderBy.js`:

```javascript
import { CHANGE_ORDER_BY } from '../constants';

const orderBy = (state=null, action) => {
    switch (action.type) {
        case CHANGE_ORDER_BY:
            return action.orderBy
        default:
            return state;
    }
};

export default orderBy;
```

`reducers/orderDir.js`:

```javascript
import { CHANGE_ORDER_DIR } from '../constants';

const orderDir = (state=null, action) => {
    switch (action.type) {
        case CHANGE_ORDER_DIR:
            return action.orderDir
        default:
            return state;
    }
};

export default orderDir;
```

`reducers/query.js`:

```javascript
import { QUERY } from '../constants';

const query = (state=null, action) => {
    switch (action.type) {
        case QUERY:
            return action.query;
        default:
            return state;
    }
}

export default query;
```

### 合成reducers


`reducers/index.js`:

```javascript
import { combineReducers } from 'redux';

import apts from './apts';
import openDialog from './openDialog';
import formExpanded from './formExpanded';
import query from './query';
import orderBy from './orderBy';
import orderDir from './orderDir';

// redux提供的combineReducers函数用来将处理不同部分的state的函数合成一个
// 每当action进来的时候会经过每一个reducer函数，但是由于action类型(type)的不同
// 只有符合(switch语句的判断)的reducer才会处理,其他的只是将state原封不动返回

const reducers = combineReducers({
    apts,
    openDialog,
    formExpanded,
    query,
    orderBy,
    orderDir
});

export default reducers;
```

## 容器组件

`containers/AddForm.js`:

```javascript
import { connect } from 'react-redux';

import { addApt, toggleDialog, toggleFormExpanded } from '../actions';

import AddForm from '../components/AddForm';

// AddForm组件可通过props来获取两个state：open和formExpanded
const mapStateToProps = (state) => ({
    open: state.openDialog,
    formExpanded: state.formExpanded
});

// 使得AddForm组件可以通过props得到三个回调函数，调用即可相当于发起action
const mapDispatchToProps = ({
    toggleFormExpanded,
    toggleDialog,
    handleAdd: newApt => addApt(newApt)
});

// 使用react-redux提供的connect函数，可以将一个组件提升为容器组件，容器组件可直接获取到state、可以直接使用dispatch。
// 这个connect函数接受两个函数作为参数，这两个作为参数的函数的返回值都是对象, 按约定他们分别命名为mapStateToProps，mapDispatchToProps
// mapStateToProps确定了在这个组件中可以获得哪些state，这里的话只用到了两个UI相关的state：open和formExpanded，这些state都可通过组件的props来获取
// mapDispatchToProps本来应该是返回对象的函数，这里比较简单，直接写成一个对象，确定了哪些action是这个组件可以发起的，也是通过组件的props来获取
// connect函数的返回值是一个函数，接受一个组件作为参数。

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
```

`containers/App.js`:

```javascript
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


// 处理搜索和排序，返回处理后数组
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


// App组件可通过props来获取到四个state：query, orderBy, orderDir, apts
// 这里是真正处理搜索和排序的地方，并不是直接将state中的apts返回，而是调用handleApts，返回处理的数组
const mapStateToProps = (state) => ({
    query: state.query,
    orderBy: state.orderBy,
    orderDir: state.orderDir,
    apts: handledApts(state.apts, state.query, state.orderBy, state.orderDir),
});

// App组件可通过props来获取到四个函数，也就是发起四个action：handleSearch，handleDelete，handleOrderByChange，handleOrderDirChange
const mapDispatchToProps = ({
    handleSearch: searchText => query(searchText),
    handleDelete: id => deleteApt(id),
    handleOrderByChange: orderBy => changeOrderBy(orderBy),
    handleOrderDirChange: orderDir => changeOrderDir(orderDir)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

```

## 入口文件

`src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import './index.css';

import reducers from './reducers';

// 使用createStore表示应用的store，传入的第一个参数是reducers，第二个参数是Redux的调试工具
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// 使用react-redux提供的Provider组件，使App组件及子组件可以得到store的相关的东西，如store.getState()，store.dispatch()等。
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## 结尾

React提供的是通过state来控制控制UI和单向数据流动，
Redux提供的是单一数据源和只能通过action和reducer来处理state的更新。

以其中的点击按钮显示新建预约表单的过程来捋一捋React、React-Redux的逻辑(灵感来源于自Cory House大神)：

- 用户：点击按钮
- React：哈喽，action生成函数toggleFormExpanded，有人点击了展开新建预约的表单。
- Action： 收到，谢谢React，我马上发布一个action也就是{type: TOGGLE_FORM_EXPANDED}告诉reducers来更新state。
- Reducer： 谢谢Action，我收到你的传过来要执行的action了，我会根据你传递进来的{type: TOGGLE_FORM_EXPANDED}，先复制一份当前的state，然后把state中的formExpanded的值更新为true，然后把新的state给Store。
- Store：嗯，Reducer你干得漂亮，我收到了新的state，我会通知所有与我连接的组件，确保他们会收到新state。
- React-Redux：啊，感谢Store传来的新数据，我现在就看看React界面是否需要需要发生变化，啊，需要把新建预约的表单显示出来啊，那界面还是要更新一下的，交给你了，React。
- React：好的，有新的数据由store通过props传递下来的数据了，我会马上根据这个数据把新建预约的表单显示出来。
- 用户：看到了新建预约的表单。

如果觉得还不错，来个star吧。(笑脸)
