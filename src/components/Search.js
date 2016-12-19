import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider';

const Search = () => {
    return (
        <div>
            <TextField 
                hintText="Search" 
            />
            <SelectField floatingLabelText="Sort By" value={2} style={{textAlign: 'left'}} >
                <MenuItem value={1} primaryText="Guest's name" />
                <MenuItem value={2} primaryText="Date" />
                <Divider />
                <MenuItem value={4} primaryText="Ascending" />
                <MenuItem value={5} primaryText="Descending" />
            </SelectField> 
        </div>
    );
};

export default Search;