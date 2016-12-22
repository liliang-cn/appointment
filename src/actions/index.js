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