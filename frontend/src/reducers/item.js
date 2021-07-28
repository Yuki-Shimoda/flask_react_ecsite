import {SETITEM} from '../actions/index'

const initialState = {
  items:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case SETITEM:
      return {items: action.items}
    // case DELETEITEM:
    //   return {items: []}
    default:
      return state
  }
}