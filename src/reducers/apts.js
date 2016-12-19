import { ADD_APT, DELETE_APT } from '../constants';

let id = 0;

const apts = (state=[], action) => {
    const handleDelete = (arr, id) => {
        for(let i=0; i<arr.length; i++) {
            if (arr[i].id === id) {
                return [
                    ...arr.slice(0, i),
                    ...arr.slice(i+1)
                ]
            }
        }
    };

    switch (action.type) {
        case ADD_APT:
            return [
                ...state,
                Object.assign({}, action.apt, {
                    id: ++id
                })
            ]
        case DELETE_APT:
            return handleDelete(state, action.id);
        default:
            return state;
    }
};

export default apts;