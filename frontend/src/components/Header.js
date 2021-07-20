import React from 'react';
import {useHistory, BrowserRouter as Router} from 'react-router-dom'
import Axios from 'axios';

const Header = () =>{
    const history = useHistory();
    const handleLink = path => history.push(path);

    const toOrderHistory = ()=>{
        Axios.get('http://127.0.0.1:5000/order_history')
        .then(function(res){
            console.log(res)
        })
        handleLink('/order_history')
    }
    return (
        <React.Fragment>
            <Router>
            <button onClick={() => handleLink('/')}>Home</button>
            <button onClick={() => handleLink('/cart')}>カート</button>
            <button onClick={() => handleLink('/item_detail')}>商品詳細</button>
            <button onClick={() => toOrderHistory()}>注文履歴</button>
            {/* <button onClick={() => handleLink('/order_history')}>履歴</button> */}
            <button onClick={() => handleLink('/complete')}>完了画面</button>
            <button onClick={()=>handleLink('/login')}>ログイン</button>
            <button onClick={()=>handleLink('/signup')}>新規登録</button>
            <button onClick={()=>handleLink('/')}>トップへ戻る</button>
            </Router>
        </React.Fragment>
    )
}

export default Header