import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router,useHistory,} from 'react-router-dom';
import Axios from 'axios';

const Home = () => {
    const history = useHistory();
    const handleLink = path => history.push(path);

    const [itemList, setItems] = useState([])

    useEffect(()=>{
        console.log('useEffect発動')
        Axios.get('http://127.0.0.1:5000/')
        .then(function(res){
            const firstDbData = res.data
            const ItemArray = firstDbData
            setItems(ItemArray)
        })
    },[])

    const id_list=[]
    for (const id in itemList){
        id_list.push(Number(id))
    }

    return (
        <>
            <Router>
                <div>Home</div>
                    <ul>
                    {id_list.map((id,key)=>{
                            return(
                                <li key={key}>
                                    <p>商品ID:{id}</p>
                                    <p>商品名：{itemList[id].name}</p>
                                    <p>価格：{itemList[id].price}円</p>
                                    <img src={`${process.env.PUBLIC_URL}/static/images/${itemList[id].image}`} width="20%"></img>
                                    <button onClick={()=>handleLink(`/item_detail/${id}`)}>商品詳細</button>
                                </li>
                            )
                        })}
                    </ul>
            </Router> 
        </>

    )
}

export default Home;

{/* <p>画像パス：{itemList[id].image}</p> */}
