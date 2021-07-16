import React,{useEffect, useState} from 'react';
import {useParams,useHistory,Redirect } from 'react-router-dom';
import Axios from 'axios';

const ItemDetail = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)
    const params = useParams()
    const detailId = params.Id
    const [itemCount, setCount] = useState(1);

    const addCart = (Id,quantity)=>{
        Axios.post(`http://127.0.0.1:5000/item_detail/${Id}`, {post_quantity:quantity})
        handleLink('/cart')
    }


    const createCount = e =>{
        const newCount = e.target.value
        setCount(newCount)
        // setCount(()=>{return newCount})
        // console.log(itemCount)
    }
    // useEffect(()=>{
    //     console.log(itemCount)
    // },[itemCount])

    // useEffect(()=>{
    //    console.log(detailId) 
    // },[])
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