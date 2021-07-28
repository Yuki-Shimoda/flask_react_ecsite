import React ,{useState}from 'react';
import {useHistory,} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/index";
import Axios from 'axios';

const userSelector = state => state.userIdState

const Login = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)
    const dispatch = useDispatch();
    // const getRoutingJudge = useSelector((state) => state.routingJudge.routingJudge)
    const userIdState = useSelector(userSelector)

    const errors ={
        idError:"",
        passwordError:"",
    };

    const [inputId,setInputId]= useState('')
    const [inputPassword,setInputPassword]= useState('')
    const [errorMessage, setErrorMessage] = useState(errors)
    const [isDisabled, setIsDisabled] = useState(true)

    const isDisabledCheck = () => {
        if (errorMessage.idError === "" && errorMessage.passwordError ===""){
            setIsDisabled(false)
        } else {
          setIsDisabled(true)  
        }
    }


    const createId = e =>{
        const new_value = e.target.value
        setInputId(new_value)
        if (new_value === ""){
            errorMessage.idError = "ユーザーIDを入力してください"
            isDisabledCheck();
        } else {
            errorMessage.idError = "";
            isDisabledCheck();
        }
    };

    const createPassword = e =>{
        const new_value = e.target.value;
        setInputPassword(new_value)
        if (new_value === ""){
            errorMessage.passwordError = "パスワードを入力してください"
            isDisabledCheck();
        } else {
            errorMessage.passwordError = ""
            isDisabledCheck();
        }
    };

    const setUserInfo = (inputId, inputPassword) =>{
        localStorage.setItem('uid',inputId);
        localStorage.setItem('password',inputPassword);
    }

    // const setLoginUser =()=> dispatch(login(inputId,inputPassword))
    const loginUser = () =>{
    // Axios.post('http://127.0.0.1:5000/login',{userLoginInfo:{post_id:id, post_password:password}})
        dispatch(login(inputId,inputPassword))
        if(!userIdState.loginUser){
            console.log('ローカルストレージ保存')
            setUserInfo(inputId,inputPassword);
        }
        console.log('ログインします')
        
        handleLink('/')
    }

    return (
        <>
            <h2>ログイン</h2>
            <div>
                <label>ユーザーID: </label>
                <input type="text" name="input_id" onChange={createId}/><br/>
            </div>
            <div>
                <span>{errorMessage.idError}</span>
            </div>
            <div>
                <label>パスワード: </label>
                <input type="password" name="input_password" onChange={createPassword}/><br/>
            </div>
            <div>
                <span>{errorMessage.passwordError}</span>
            </div>
            <button onClick={loginUser} disabled={isDisabled}>ログイン</button>
        </>
        
    )
}

export default Login