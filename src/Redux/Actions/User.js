import {
    SET_USER_LOGIN,
    SET_USER,
    SET_LIST,
    SET_PERCENT
} from './Types';

export const setUserLogIn = (status) => {
    return {
        type: SET_USER_LOGIN,
        payload: status
    }
}

export const setUser = (username) => {
    return {
        type: SET_USER,
        payload: username
    }
}

export const setList = (list) => {
    return {
        type: SET_LIST,
        payload: list
    }
}

export const setPercent = (percent) => {
    return {
        type: SET_PERCENT,
        payload: percent
    }
}