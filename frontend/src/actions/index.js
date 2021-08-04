// import {CART_STATUS_IN} from './status'
import Axios from 'axios';

//初期表示商品情報
export const SETITEM = 'setItem'
export const setItem = () => dispatch => {
  Axios.get('http://127.0.0.1:5000/').then(function(res) {
    let items = Object.values(res.data)
    return dispatch({
      type:SETITEM,
      items:items
    })
  })
}

//カート情報
export const SETCART = 'setCart'
export const setCart = () => dispatch => {
  console.log('actionsのsetCart発動')
  Axios.get('http://127.0.0.1:5000/cart/').then(function(res) {
    console.log(res.data)
    const cartItems = res.data
    return dispatch({
      type:SETCART,
      cart:cartItems
    })
  })
}

export const DELETECART = 'deleteCart'
export const deleteCart = (deleteId) => dispatch => {
  console.log(deleteId)
  Axios.post(`http://127.0.0.1:5000/delete_cartitem/${deleteId}`).then(function(res){
    console.log(res)
    return dispatch({
      type:DELETECART,
      cart:res.data
    })
  })
}
    // console.log('deleteおk')
//     return dispatch({
//   Axios.post('http://127.0.0.1:5000/delete_cartitem/${deleteId}').then(function(res) {
//     console.log('deleteおk')
//     return dispatch({
//       type:DELETECART,
//       cart:res.data
//     })
//   }) 
// }

//注文履歴
export const ORDERED = 'ordered'
export const ordered = (id,quantity) => dispatch => {
  Axios.get('http://127.0.0.1:5000/order_history/')
  .then(function(res) {
      // console.log(res.data) //{{3: {…}, 4: {…}, 5: {…}}} 
      const data = Object.values(res.data) //[{…}, {…}, {…}]
      return dispatch({
        type:ORDERED,
        orderData:data
      })
  })
}

//注文済商品キャンセル
export const ORDERCANCEL = 'orderCancel'
export const orderCancel = (id) => dispatch => {
  Axios.post(`http://127.0.0.1:5000/order_history/${id}`)
  // return ('OK')
}

export const SIGNUP ='signup'
export const signup = (username, userid, password) =>{
  return ()=>{
    Axios.post(`http://127.0.0.1:5000/signup`,{userInfo:{post_name:username,post_id:userid,post_password:password}})
    // .then(function(res){
    //   console.log(res.data)
    // })
  }
}


export const SET_USER_INFO ='setUserInfo'
export const LOGIN = 'login'
export const login =(id, password)=> dispatch=>{
  Axios.post('http://127.0.0.1:5000/login',{userLoginInfo:{post_id:id, post_password:password}})
  .then(function(res){ // {'name': '名前3', 'id': 'user3'}
    const userId = res.data.id
    const userName = res.data.name
    return dispatch({
      type: SET_USER_INFO,
      uid: userId,
      name: userName,
    })
  })
}

export const DELETE_USER_INFO ='deleteUserInfo'
export const deleteUserInfo = () => {
  Axios.post('http://127.0.0.1:5000/logout')
  return (
    {
      type: DELETE_USER_INFO,
      uid: '',
      name: '',
      login_user: false
    }
  )
}