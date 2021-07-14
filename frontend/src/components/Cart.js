import React,{useState,useEffect} from 'react';
import {useHistory,} from 'react-router-dom';
import Axios from 'axios';

const Cart = () => {
    const history = useHistory()
    const handleLink = path => history.push(path)
    const [orderInfo,setOrder]=useState('')
    const [destinationName,setDesitinationName]=useState('')
    const [destinationZipcode,setDesitinationZipcode]=useState('')
    const [destinationAddress,setDesitinationAddress]=useState('')
    const [destinationTel,setDesitinationTel]=useState('')

    const orderComplete =(Info,Name,Zipcode,Address,Tel)=>{
        Axios.post(`http://127.0.0.1:5000/cart`, {post_orderInfo:{info:Info, destinationName:Name,destinationZipcode:Zipcode, destinationAddress:Address, destinationTel:Tel}})
        handleLink('/complete')
    }
    
    const createInfo = e =>{
        setOrder(e.target.value)
        // console.log(orderInfo)
    }

    const createName = e =>{
        setDesitinationName(e.target.value)
    }
    const createZipcode = e =>{
        setDesitinationZipcode(e.target.value)
    }
    const createAddress = e =>{
        setDesitinationAddress(e.target.value)
    }
    const createTel = e =>{
        setDesitinationTel(e.target.value)
    }


    // useEffect(()=>{
    //     console.log(orderInfo)
    // },[orderInfo])
    return (
        <>
        <div>Cart</div>
        宛先情報：<input type="text" onChange={createInfo}/><br/>
        名前：<input type="text" name="destinationName"onChange={createName} /><br/>
        郵便番号：<input type="text" onChange={createZipcode}/><br/>
        住所：<input type="text" onChange={createAddress}/><br/>
        電話：<input type="text" onChange={createTel}/><br/>
        <button onClick={()=>orderComplete(orderInfo,destinationName,destinationZipcode,destinationAddress,destinationTel)}>注文確定</button>
        </>
    )
}

export default Cart