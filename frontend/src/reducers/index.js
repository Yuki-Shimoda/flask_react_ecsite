import {combineReducers} from 'redux'
import userIdState from './user'
import item from './item'
import ordered from './cart'
import login from './login'

export default combineReducers({userIdState,item,login, ordered})
