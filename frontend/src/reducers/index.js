import {combineReducers} from 'redux'
// import user from './user'
import item from './item'
import ordered from './cart'


export default combineReducers({item, ordered})