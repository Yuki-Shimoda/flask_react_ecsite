import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

const OrderHistory = () => {
    const [list, setList] = useState([])
    const classes = useStyles();
    const [secondary, setSecondary] = React.useState(false);

    // //初期表示        
    useEffect(() => {
        Axios.get('http://127.0.0.1:5000/orderhistory')
        .then(function(res) {
            setList(res.data.itemList)
            console.log(res.data.itemList)
        })
    }, [])
        
return (
  <>
  <Typography variant="h6" className={classes.title}>
    注文履歴
  </Typography>
  {/* <Grid container alignItems="center" justify="center"> */}
  <Grid container alignItems="center">
    <Grid item xs={6}>
      <div className={classes.demo}>
        <List>
          {list.map(item => {
              return (
                <div className={classes.root}>
                  <ListItem>
                      <ListItemAvatar>
                      <Avatar>
                          <FolderIcon />
                      </Avatar>
                      </ListItemAvatar>
                      <ListItemText               
                      primary={item.id  + '番のitem名:' + item.quantity + '個'}
                      secondary={secondary ? 'Secondary text' : '商品説明'}
                      />
                      <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                      </IconButton>
                      </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>
              )
          })}
        </List>
      </div> 
    </Grid>
  </Grid>
  </>
)
}

export default OrderHistory 