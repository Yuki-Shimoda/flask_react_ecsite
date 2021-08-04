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
    // case NEWCART:
    //   return {
    //     cart: action.cartData,
    //     orders:[],
    //     userInfo:state.userInfo
    //   }
    // case ADDCART:
    //   return {
    //     cart: action.cartData,
    //     orders:[],
    //     userInfo:state.userInfo
    //   }
    // case CARTRESET:
    //   return {
    //     cart: "",
    //     orders:[],
    //     userInfo:""
    //   }
    // case DELETECART:
    //   return {
    //     cart: action.cartData,
    //     orders:[],
    //     userInfo:state.userInfo
    //   }
    // case ORDERSET:
    //   if(state.orders == null){
    //     return {
    //       cart:state.cart,
    //       orders:[...action.orderData],
    //       userInfo:""
    //     }
    //   }else {
    //     return {
    //       cart:state.cart,
    //       orders:[...state.orders, action.orderData],
    //       userInfo:""
    //     }
    //   }
    // case ORDERRESET:
    //   return {
    //     cart:state.cart,
    //     orders:[],
    //     userInfo: ""
    //   }
    // case ORDER:
    //   return {
    //     cart:"",
    //     orders:[],
    //     userInfo:""
    //   }
    // case NEWUSERINFO:
    //   return{
    //     cart: "",
    //     orders:[],
    //     userInfo: action.userInfo
    //   }
    // case UPDATEUSERINFO:
    //   return{
    //     cart: "",
    //     orders: [],
    //     userInfo: action.userInfo
    //   }
    // case USERINFOSET:
    //   return{
    //     cart: state.cart,
    //     orders: [],
    //     userInfo: action.userInfo
    //   }
    // case USERINFORESET:
    //   return{
    //     cart: "",
    //     orders:[],
    //     userInfo: ""
    //   }

    default:
      return state
  }
}