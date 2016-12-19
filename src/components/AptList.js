import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 12,
};

const AptList = ({apts}) => {
    return (
        <div>
            <h2>Appointments List</h2>
            <List>
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
                                    <RaisedButton style={buttonStyle} label="Done" primary={true} />
                                    <RaisedButton style={buttonStyle} label="Delete" secondary={true} />
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