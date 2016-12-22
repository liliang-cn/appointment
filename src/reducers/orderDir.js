import { CHANGE_ORDER_DIR } from '../constants';

const orderDir = (state=null, action) => {
    switch (action.type) {
        case CHANGE_ORDER_DIR:
            return action.orderDir
        default:
            return state;
    }
};

export default orderDir;