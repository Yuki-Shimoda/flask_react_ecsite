import React ,{useState}from 'react';
import {useHistory,} from 'react-router-dom';
import Axios from 'axios';

const Signup = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)

    const [inputName,setInputName]=useState('')
    const [inputId,setInputId]=useState('')
    const [inputPassword,setInputPassword]=useState('')

    const register =(name,id,password)=> {
        Axios.post(`http://127.0.0.1:5000/signup`,{userInfo:{post_name:name,post_id:id,post_password:password}})
        handleLink('/login')}

    const createName = e =>{
        setInputName(e.target.value)
    }
    const createId = e =>{
        setInputId(e.target.value)
    }
    const createPassword = e =>{
        setInputPassword(e.target.value)
    }
    return (
        <>
            <div>新規登録</div>
            名前：<input type="text" name="input_name" onChange={createName}/><br/>
            ID:<input type="text" name="input_id" onChange={createId}/><br/>
            パスワード：<input type="password" name="input_password" onChange={createPassword}/><br/>
            <button onClick={()=>register(inputName,inputId,inputPassword)}>新規登録</button>
        </>
    )
}

export default Signup