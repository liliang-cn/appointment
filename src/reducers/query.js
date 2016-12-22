import { QUERY } from '../constants';

const query = (state=null, action) => {
    switch (action.type) {
        case QUERY:
            return action.query;
        default:
            return state;
    }
}

export default query;