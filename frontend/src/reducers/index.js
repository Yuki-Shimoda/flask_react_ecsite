import {combineReducers} from 'redux'
import userIdState from './user'
import item from './item'
import login from './login'
// import cart from './cart'


export default combineReducers({userIdState,item,login})