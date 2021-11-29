import {
  SET_LIST,
  SET_PERCENT,
  SET_USER,
  SET_USER_LOGIN
} from '../Actions/Types';


let initialState = {
  isLogIn: false,
  name: '',
  list:[],
  percent: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        name: action.payload
      }
    case SET_USER_LOGIN:
      return {
        ...state,
        isLogIn: action.payload
      }
    case SET_LIST:
      return {
        ...state,
        list : action.payload
      }
    case SET_PERCENT:
      return{
        ...state,
        percent: action.payload
      }
    default:
      return state
  }
};