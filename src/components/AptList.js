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
                                    <RaisedButton style={buttonStyle} label="Delete" secondary={true} onClick={() => handleDelete(apt.id)}/>
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