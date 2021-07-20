import React from 'react';
import {useHistory,} from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)
    const loginUser = () =>handleLink('/')
    return (
        <>
            <div>ログイン</div>
            ID:<input type="text" name="input_id"/><br/>
            パスワード：<input type="text" name="input_password"/><br/>
            <button onClick={()=>loginUser()}>ログイン</button>
        </>
        
    )
}

export default Login