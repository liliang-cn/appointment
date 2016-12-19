import { ADD_APT, DELETE_APT } from '../constants';

let id = 0;

const apts = (state=[], action) => {
    const handleDelete = (arr, id) => {
        let deleteIndex = null;
        for(let i=0;i<arr.length;i++) {
            if (arr[i].id === id) {
                deleteIndex = i;
            }
        }
        return [
            ...arr.slice(0, deleteIndex),
            ...arr.slice(deleteIndex+1)
        ]
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