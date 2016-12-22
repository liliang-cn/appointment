import { TOGGLE_FORM_EXPANDED } from '../constants';

const formExpanded = (state=false, action) => {
    switch (action.type) {
        case TOGGLE_FORM_EXPANDED:
            return !state;
        default:
            return state;
    }
};

export default formExpanded;