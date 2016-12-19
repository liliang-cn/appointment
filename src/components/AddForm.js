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

const AddForm = () => {
    return (
        <Paper style={paperStyle} zDepth={2}>
            <Card style={{textAlign: 'left'}}>
                <CardHeader
                    title="New Appointment"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <form>
                        <TextField
                            floatingLabelText="Guest's Name"
                            underlineShow={false}
                        />
                        <Divider />
                        <DatePicker hintText="Date" mode="landscape" underlineShow={false}/>
                        <Divider />
                        <TimePicker
                            hintText="Time"
                            okLabel="OK"
                            cancelLabel="Cancel"
                            underlineShow={false}
                        />
                        <Divider />
                        <TextField
                            floatingLabelText="Note"
                            underlineShow={false}
                        />
                        <Divider />
                        <RaisedButton label="Add" primary={true} style={buttonStyle} />
                        <RaisedButton label="Cancel" secondary={true} style={buttonStyle} />
                    </form>
                </CardText>
            </Card>
        </Paper>
    );
};

export default AddForm;