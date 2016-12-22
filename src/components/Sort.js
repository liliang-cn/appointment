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