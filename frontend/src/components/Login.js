import React ,{useState}from 'react';
import {useHistory,} from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)

    const [inputId,setInputId]=useState('')
    const [inputPassword,setInputPassword]=useState('')

    const loginUser = (id,password) =>{
        Axios.post('http://127.0.0.1:5000/login',{userLoginInfo:{post_id:id, post_password:password}})
        handleLink('/')
    }

    const createId = e =>{
        setInputId(e.target.value)
    }

    const createPassword = e =>{
        setInputPassword(e.target.value)
    }
    return (
        <>
            <div>ログイン</div>
            ID:<input type="text" name="input_id" onChange={createId}/><br/>
            パスワード：<input type="password" name="input_password" onChange={createPassword}/><br/>
            <button onClick={()=>loginUser(inputId,inputPassword)}>ログイン</button>
        </>
        
    )
}

export default Login