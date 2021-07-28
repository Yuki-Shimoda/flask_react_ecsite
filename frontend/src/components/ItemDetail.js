import React,{useState} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import Axios from 'axios';

const userSelector = state => state.userIdState

const ItemDetail = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)
    const params = useParams()
    const detailId = params.Id
    const [itemCount, setCount] = useState(1);
    const userIdState = useSelector(userSelector)

    const addCart = (Id,quantity)=>{
        if (userIdState.login_user){
            console.log(`ログインの有無:　${userIdState.login_user}`)
            console.log(`ログインuid：　${userIdState.uid}`)
            const uid =userIdState.uid
            Axios.post(`http://127.0.0.1:5000/item_detail/${Id}`, {post_quantity:quantity,post_userId:uid})
        }else{
            console.log('userきてない')
        }
        // Axios.post(`http://127.0.0.1:5000/item_detail/${Id}`, {post_quantity:quantity})
        handleLink('/cart')
    }

    const createCount = e =>{
        const newCount = e.target.value
        setCount(newCount)
    }
    return (
        <>
        <div>ItemDetail：{detailId}</div>
        <form action="/item_detail/{{ detailId }}" method="POST">
            <label id="itemCount">数量を選択してください</label>
            <select name="itemCount" onChange={createCount}>
                <option value="1" name="1">1</option>
                <option value="2" name="2">2</option>
                <option value="3" name="3">3</option>
                <option value="4" name="4">4</option>
                <option value="5" name="5">5</option>
            </select>
            <button onClick={()=>addCart(detailId,itemCount)}>カートへ追加</button>
        </form>

        </>
    )
}

export default ItemDetail