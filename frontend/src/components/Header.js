import React from 'react';
import {useHistory, BrowserRouter as Router} from 'react-router-dom'

const Header = () =>{
    const history = useHistory();
    const handleLink = path => history.push(path);
    return (
        <React.Fragment>
            <Router>
            <button onClick={() => handleLink('/')}>Home</button>
            <button onClick={() => handleLink('/cart')}>カート</button>
            <button onClick={() => handleLink('/item_detail')}>商品詳細</button>
            <button onClick={() => handleLink('/order_history')}>履歴</button>
            <button onClick={() => handleLink('/complete')}>完了画面</button>
            <button onClick={()=>handleLink('/')}>トップへ戻る</button>
            </Router>
        </React.Fragment>
    )
}

export default Header