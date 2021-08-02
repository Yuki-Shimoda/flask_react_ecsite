import { SET_USER_INFO, DELETE_USER_INFO } from '../actions/index'

const initialState = {
  uid: 'iuy',
  name: 'namae',
  login_user: false
}

const userIdState = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      console.log('SET_USER_INFOが発火')
      return{
        uid:action.uid,
        name:action.name,
        login_user:action.login_user
      }
      // state.uid = action.uid;
      // state.login_user = action.login_user;
      // if (action.name !== null) {
      //   state.name = action.name;
      // }
      // console.log('ユーザー情報をStateに保存')
      // console.log(state)
      // return state;
    case DELETE_USER_INFO:
      console.log('DELETE_USER_INFOが発火')
      state.uid = action.uid;
      state.name = action.name;
      state.login_user = action.login_user;
      return state;
    default:
      return state
  }
};
export default userIdState;