import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const paperStyle = {
  width: 340,
  margin: '0 auto 20px',
  textAlign: 'center'
};

const buttonStyle = {
    margin: 12
};

const AddForm = ({handleAdd}) => {
    let guestName, date, time, note;
    const onAdd = () => {
        handleAdd({guestName, date, time, note})
    };

    const handleDateChange = (event, aptDate) => {
        date = aptDate;
    };

    const handleTimeChange = (event, aptTime) => {
        time = aptTime;
    };

    return (
        <Paper style={paperStyle} zDepth={2}>
            <Card style={{textAlign: 'left'}}>
                <CardHeader
                    title="New Appointment"
                    actAsExpander={true}
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
                    <RaisedButton label="Cancel" secondary={true} style={buttonStyle} />
                </CardText>
            </Card>
        </Paper>
    );
};

export default AddForm;