import { CHANGE_ORDER_BY } from '../constants';

const orderBy = (state=null, action) => {
    switch (action.type) {
        case CHANGE_ORDER_BY:
            return action.orderBy
        default:
            return state;
    }
};

export default orderBy;