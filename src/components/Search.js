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