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

export const DELETEITEM = 'deleteItem'
export const deleteItem = () => ({
  type:DELETEITEM
})

//注文済商品情報
export const ORDERED = 'ordered'
export const ordered = (id,quantity) => dispatch => {
  Axios.get('http://127.0.0.1:5000/order_history/')
  .then(function(res) {
      console.log(res.data) //{{3: {…}, 4: {…}, 5: {…}}} 
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
  // return dispatch({
  //   type:ORDERED,
  // })
  return ('OK')
}

// カートに商品を追加
// 指定ユーザーのカートテーブルstatus0のものをDBから取得
// export const CARTSET = 'cartSet'
// export const cartSet = (id, quantity) => dispatch => {
//   const id = 3
//   Axios.post('http://127.0.0.1:5000/item_detail/${id}',{post_quantity:quantity}).then( res => {
//     console.log(res)
//     data = res.data
//   // Axios.post(`users/${user.uid}/orders`).get().then(snapshot => {
//     // snapshot.forEach(item => {
//     //   const data = item.data()
//     //   data.orderId = item.id
//       // if(data.status === CART_STATUS_IN){
//         // if(data.status === 0)
//           dispatch ({
//             type:CARTSET,
//             cartData:data
//           })
//       }) 
//     )
//   }
// export const CARTRESET = 'cartReset'
// export const cartReset = () => ({
//   type:CARTRESET
// })

// export const NEWCART = 'newCart'
// export const newCart = (user, cart) => dispatch => {
//   if(user){
//     firebase.firestore().collection(`users/${user.uid}/orders`).add(cart).then(doc => {
//       cart.orderId = doc.id
//       return dispatch ({
//         type:NEWCART,
//         cartData:cart
//       })
//     })
//   } else {
//     return dispatch ({
//       type:NEWCART,
//       cartData:cart
//     })
//   }
// }

// export const ADDCART = 'addCart'
// export const addCart = (user, cart) => dispatch => {
//   if(user){
//     firebase.firestore().collection(`users/${user.uid}/orders`).doc(cart.orderId).update(cart).then(() => {
//       return dispatch ({
//         type:ADDCART,
//         cartData:cart
//       })
//     })
//   } else {
//     return dispatch ({
//       type:ADDCART,
//       cartData:cart
//     })
//   }
// }

// export const DELETECART = 'deleteCart'
// export const deleteCart = (user, cart) => dispatch => {
//   if(user){
//     firebase.firestore().collection(`users/${user.uid}/orders`).doc(cart.orderId).update(cart).then(() => {
//       return dispatch ({
//         type:DELETECART,
//         cartData:cart
//       })
//     })
//   } else {
//     return dispatch ({
//       type:DELETECART,
//       cartData:cart
//     })
//   }
// }

// export const ORDERSET = 'orderSet'
// export const orderSet = user => dispatch => {
//   firebase.firestore().collection(`users/${user.uid}/orders`).get().then(snapshot => {
//     snapshot.forEach(item => {
//       const data = item.data()
//       if(data.status !== CART_STATUS_IN){
//         dispatch({
//           type:ORDERSET,
//           orderData:data
//         })
//       }
//     })
//   })
// }
// export const ORDERRESET = 'orderReset'
// export const orderReset = () => ({
//   type:ORDERRESET
// })


// export const ORDER = 'order'
// export const order = (user, orderInfo) => dispatch => {
//   firebase.firestore().collection(`users/${user.uid}/orders`).doc(orderInfo.orderId).update(orderInfo).then(() => {
//     // let userInfo = {
//     //   userName: orderInfo.destinationName,
//     //   email: orderInfo.destinationEmail,
//     //   zipcode: orderInfo.destinationZipcode,
//     //   address: orderInfo.destinationAddress,
//     //   tel: orderInfo.tel,
//     //   creditcardNo: orderInfo.creditcardNo
//     // }
//     // firebase.firestore().collection(`users/${user.uid}/userInfo`).add(userInfo).then(() => {

//       return dispatch ({
//         type:ORDER,
//         orderInfo:orderInfo,
//         // userInfo: userInfo
//       })
//     // })
//   }) 
// }
// export const NEWUSERINFO = "newUserInfo"
// export const newUserInfo = (user,userInfoData) => dispatch => {
//   if(user){
//     firebase.firestore().collection(`users/${user.uid}/userInfo`).add(userInfoData).then(doc => {
//       userInfoData.id = doc.id
//       return dispatch ({
//         type: NEWUSERINFO,
//         userInfo: userInfoData
//       })
//     })
//   }else{
//     return dispatch({
//       type: NEWUSERINFO,
//       userInfo: userInfoData
//     })
//   }
// }
// export const UPDATEUSERINFO = "updateUserInfo"
// export const updateUserInfo = (user,userInfoData) => dispatch => {
//   if(user){
//     firebase.firestore().collection(`users/${user.uid}/userInfo`).doc(userInfoData.id).update(userInfoData).then(() => {
//       return dispatch({
//         type: UPDATEUSERINFO,
//         userInfo: userInfoData
//       })
//     })
//   }else{
//     return dispatch({
//       type: UPDATEUSERINFO,
//       userInfo: userInfoData
//     })
//   }
// }

// export const USERINFOSET = 'userInfoSet'
// export const userInfoSet = (user) => dispatch => {
//   firebase.firestore().collection(`users/${user.uid}/userInfo`).get().then(snapshot => {
//     snapshot.forEach(item => {
//       const data = item.data()
//       data.id = item.id
//           dispatch ({
//             type:USERINFOSET,
//             userInfo: data
//           })
//     })
//   })
// }

// export const USERINFORESET = 'userInfoReset'
// export const userInfoReset = () => ({
//   type:USERINFORESET
// })

