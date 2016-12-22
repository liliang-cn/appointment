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

const AddForm = ({handleAdd, open, toggleDialog, formExpanded, toggleFormExpanded}) => {
    let guestName, date, time, note;

    const onAdd = () => {
        guestName && date && time && note
        ?
        handleAdd({guestName, date, time, note}) && toggleFormExpanded()
        :
        toggleDialog()
    };

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