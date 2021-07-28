import {LOGIN} from '../actions/index'
const initialState = {
    loginuser:''
}
export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {loginuser: action.loginuser}
        default:
            return state
    }
  }