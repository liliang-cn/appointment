import { combineReducers } from 'redux';

import apts from './apts';
import openDialog from './openDialog';
import formExpanded from './formExpanded';
import query from './query';
import orderBy from './orderBy';
import orderDir from './orderDir';

const reducers = combineReducers({
    apts,
    openDialog,
    formExpanded,
    query,
    orderBy,
    orderDir
});

export default reducers;