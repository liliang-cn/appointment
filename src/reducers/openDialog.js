import { TOGGLE_DIALOG } from '../constants';

const openDialog = (state=false, action) => {
    switch (action.type) {
        case TOGGLE_DIALOG:
            return !state;
        default:
            return state;
    }
};

export default openDialog;