import React ,{useEffect, useState}from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import { useDispatch,useSelector } from "react-redux";
import { signup } from "../actions/index";

const Signup = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)
    const dispatch = useDispatch();
    // const getRoutingJudge = useSelector((state) => state.routingJudge.routingJudge)

    const errors ={
        nameError: "",
        idError: "",
        passwordError: "",
        confirmPasswordError: ""
    };

    const [inputName,setInputName]=useState(''),
        [inputId,setInputId]=useState(''),
        [inputPassword,setInputPassword]=useState(''),
        [confirmPassword,setConfirmPassword]=useState(''),
        [errorMessage, setErrorMessage] = useState(errors),
        [isDisabled, setIsDisabled] = useState(true)

    const isDisabledCheck = () =>{
        if(errorMessage.nameError === "" && errorMessage.idError === "" && errorMessage.passwordError === "" && errorMessage.confirmPasswordError === ""){
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const clear = () => {
        setInputName('');
        setInputId('');
        setInputPassword('');
        setConfirmPassword('');
        errorMessage.nameError = "名前を入力してください"
        errorMessage.idError = "ユーザーIDを入力してください"
        errorMessage.passwordError = "パスワードを入力してください"
        errorMessage.confirmPasswordError = "確認用パスワードを入力してください"
        isDisabledCheck();
      }
    
    // useStateにラグがあり、バリデーションが効かなくなるため初期表示で一度Errorsを初期化
    useEffect(()=>{
        clear();
    },[])

    const createName = e =>{
        const new_value = e.target.value
        setInputName(new_value)
        if(new_value === ""){
            errorMessage.nameError = "名前を入力してください"
            isDisabledCheck();
        } else {
            errorMessage.nameError = "";
            isDisabledCheck();
        }
    }
    const createId = e =>{
        const new_value = e.target.value
        setInputId(new_value)
        if(new_value === ""){
            errorMessage.idError = "ユーザーIDを入力してください"
            isDisabledCheck();
        } else {
            errorMessage.idError = "";
            isDisabledCheck();
        }
    }
    const createPassword = e =>{
        const new_value = e.target.value
        setInputPassword(new_value)
        if(new_value === ""){
            errorMessage.passwordError = "パスワードを入力してください"
            isDisabledCheck();
        } else {
            errorMessage.passwordError = "";
            isDisabledCheck();
        }
    }
    const createConfirmPassword = e =>{
        const new_value = e.target.value
        setConfirmPassword(new_value)
        // console.log(confirmPassword)
        if(new_value === ""){
            errorMessage.confirmPasswordError = "確認用パスワードを入力してください"
            isDisabledCheck();
        } else if (new_value !== inputPassword){
            errorMessage.confirmPasswordError = "確認用パスワードを一致させてください"
            isDisabledCheck();
        }
        else {
            errorMessage.confirmPasswordError = "";
            isDisabledCheck();
            console.log(errorMessage)
        }
    }

    const register =()=> {
        // Axios.post(`http://127.0.0.1:5000/signup`,{userInfo:{post_name:inputName,post_id:inputId,post_password:inputPassword}})
        // localStrage.setItem('routingJudge', Number(getRoutingJudge))
        // console.log(inputName)
        // console.log(inputId)
        // console.log(inputPassword)
        dispatch(signup(inputName,inputId,inputPassword))
        handleLink('/login')}

    return (
        <>
            <h2>新規登録</h2>
            <div>
                <label>名前: </label>
                <input type="text" name="input_name" value={inputName} onChange={createName}/><br/>
            </div>
            <div style={{color: 'red'}}>
                <span>{errorMessage.nameError}</span>
            </div>
            <div>
                <label>ユーザーID: </label>
                <input type="text" name="input_id" value={inputId} onChange={createId}/><br/>
            </div>
            <div style={{color: 'red'}}>
                <span>{errorMessage.idError}</span>
            </div>
            <div>
                <label>パスワード: </label>
                <input type="password" name="input_password" value={inputPassword} onChange={createPassword}/><br/>
            </div>
            <div style={{color: 'red'}}>
                <span>{errorMessage.passwordError}</span>
            </div>
            <div>
                <label>確認用パスワード: </label>
                <input type="password" name="input_confirm_password" value={confirmPassword} onChange={createConfirmPassword}/><br/>
            </div>
            <div style={{color: 'red'}}>
                <span>{errorMessage.confirmPasswordError}</span>
            </div>
            <button onClick={register} disabled={isDisabled}>新規登録</button>
            <button onClick={clear}>クリア</button>
        </>
    )
}

export default Signup