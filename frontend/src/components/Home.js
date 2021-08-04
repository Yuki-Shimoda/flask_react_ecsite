import React, { useEffect, useState } from "react";
// import {BrowserRouter as Router,useHistory,} from 'react-router-dom';
// import Axios from 'axios'; actionsで実行
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setItem, setCart} from "../actions/index";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import SortIcon from "@material-ui/icons/Sort";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 220,
    },
    cardList: {
      display: "flex",
      flexWrap: "wrap",
      listStyleType: "none",
      boxSizing: "borderBox",
    },
    card: {
      width: "25%",
      marginTop: "30px",
      fontSize: "2px",
    },
    input: {
      margin: "30px 5px 0 0",
    },
    buttonSearch: {
      margin: "45px 5px 0 0",
    },
    buttonClear: {
      margin: "45px 5px 0 0",
    },
  });

// const itemsSelector = (state) => state.item.items;

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state)
  let items = selector.item.items
  const [array, setArray] = useState(items);
  const [mozi, setMozi] = useState("");
  const [resultState, setResultState] = useState(false);
  const [karamozi, setKaramozi] = useState(false);

  useEffect(() => {
    dispatch(setItem());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCart());
  }, [dispatch]);

  useEffect(() => {
    setArray(items);
  }, [items]);

  const searchWord = () => {
    setArray(items);
    let arr = items.filter((item) => {
      return 0 <= item.name.indexOf(mozi);
    });
    const result = arr.length === 0;
    setResultState(result);
    const karaResult = mozi === "";
    setKaramozi(karaResult);
    setArray(arr);
    if (arr.length === 0) {
      setArray(items);
    }
  };

  const clearWord = () => {
    setMozi("");
    setResultState(false);
    setArray(items);
    setKaramozi(false);
  };

  const handleSortByAscend = () => {
    const ue = [...array];
    ue.sort((a, b) => {
      return a.price - b.price;
    });
    setArray(ue);
  };

  const handleSortByDescend = () => {
    const shita = [...array];
    shita.sort((a, b) => {
      return b.price - a.price;
    });
    setArray(shita);
  };

  const sortReset = () => {
    setArray(items);
  };
  const bunki = (e) => {
    const shori = e.target.value;
    if (shori === "normal") {
      sortReset();
    } else if (shori === "low") {
      handleSortByAscend();
    } else if (shori === "high") {
      handleSortByDescend();
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <TextField
          className={classes.input}
          id="filled-basic"
          label="Search Noodle"
          variant="filled"
          noValidate
          autoComplete="off"
          value={mozi}
          onChange={(e) => setMozi(e.target.value)}
        />
        <Button
          className={classes.buttonSearch}
          variant="contained"
          style={{ color: "#fff", backgroundColor: "#CF000D" }}
          onClick={searchWord}
        >
          検索
          <SearchIcon />
        </Button>
        <Button
          className={classes.buttonClear}
          variant="contained"
          style={{ color: "#fff", backgroundColor: "#CF000D" }}
          onClick={clearWord}
        >
          クリア
          <DeleteIcon />
        </Button>
      </div>
      <div style={{ float: "right", fontSize: "13px" }}>
        <SortIcon style={{ fontSize: "13px" }} /> 並び替え：
        <select
          name="sort"
          onChange={(e) => {
            bunki(e);
          }}
        >
          <option value="normal">標準</option>
          <option value="low">値段が低い順</option>
          <option value="high">値段が高い順</option>
        </select>
      </div>
      {resultState && (
        <h2 style={{ textAlign: "center" }}>一致する商品がありません</h2>
      )}
      {karamozi && (
        <h2 style={{ textAlign: "center" }}>検索キーワードが空欄です</h2>
      )}
      <ol className={classes.cardList}>
        {array.map((item) => (
          <li key={item.id} className={classes.card}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media}>
                  <Link to={`/item_detail/${item.id}`}>
                    <img
                      style={{ width: 345, height: 200 }}
                      src={`${process.env.PUBLIC_URL}/static/images/${item.image}`}
                      alt="Logo"
                    />
                  </Link>
                </CardMedia>
                <CardContent>
                  <Link to={`/item_detail/${item.id}`} style={{ fontSize: 20 }}>
                    <div style={{ fontSize: 20, textAlign: "center" }}>
                      {item.name}
                    </div>
                  </Link>
                  <p style={{ fontSize: 16, textAlign: "center" }}>
                     {item.price.toLocaleString()}円(税込)
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
    // const history = useHistory();
    // const handleLink = path => history.push(path);

    // const [itemList, setItems] = useState([])

    // useEffect(()=>{
    //     console.log('useEffect発動')
    //     Axios.get('http://127.0.0.1:5000/')
    //     .then(function(res){
    //         const firstDbData = res.data
    //         const ItemArray = firstDbData
    //         setItems(ItemArray)
    //     })
    // },[])

    // const id_list=[]
    // for (const id in itemList){
    //     id_list.push(Number(id))
    // }

    // return (
    //     <>
    //         <Router>
    //             <div>Home</div>
    //                 <ul>
    //                 {id_list.map((id,key)=>{
    //                         return(
    //                             <li key={key}>
    //                                 <p>商品ID:{id}</p>
    //                                 <p>商品名：{itemList[id].name}</p>
    //                                 <p>価格：{itemList[id].price}円</p>
    //                                 {/* <p>画像パス：{itemList[id].image}</p> */}
    //                                 <img src={`${process.env.PUBLIC_URL}/static/images/${itemList[id].image}`} width="20%"></img>
    //                                 <button onClick={()=>handleLink(`/item_detail/${id}`)}>商品詳細</button>
    //                             </li>
    //                         )
    //                     })}
    //                 </ul>
    //         </Router> 
    //     </>

    // )
}

export default Home;

