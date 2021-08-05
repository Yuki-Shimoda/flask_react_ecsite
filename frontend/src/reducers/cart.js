import {ORDERED, ORDERCANCEL, SETCART, DELETECART} from '../actions/index'

const initialState = {
  cart:[],
  orders:[],
  login_user:false
}

export default (state = initialState, action) => {
  switch(action.type){
    case ORDERED:
      return {
        cart: [],
        orders:action.orderData,
        login_user:true
      }
    case ORDERCANCEL:
      return {
        cart:[],
        orders:action.orderData,
        login_user:true
      }
    case SETCART:
      console.log('setCart発動')
      console.log(action.cart)
      return {
        cart: action.cart,
        orders:[],
        login_user:true
      }
      case DELETECART:
        console.log('deleteCart発動')
        console.log(action.cart)  
      return {  
        cart: action.cart,
        orders:[],
        login_user:true
      }

    default:
      return state
  }
}