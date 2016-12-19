import { ADD_APT, DELETE_APT } from '../constants';

export const addApt = (apt) => ({
    type: ADD_APT,
    apt
});

export const deleteApt = (id) => ({
    type: DELETE_APT,
    id
});