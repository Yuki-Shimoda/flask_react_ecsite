import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleLink = path => history.push(path);
  return (
    <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}Navつける？
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            🦀
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit" onClick={() => handleLink('/')}>Home</Button>
            <Button color="inherit" onClick={() => handleLink('/cart')}>カート</Button>
            <Button color="inherit" onClick={() => handleLink('/item_detail')}>商品詳細</Button>
            <Button color="inherit" onClick={() => handleLink('/order_history')}>履歴</Button>
            <Button color="inherit" onClick={() => handleLink('/complete')}>完了画面</Button>
        </Toolbar>
        </AppBar>
        <Button color="primary" onClick={()=>handleLink('/')}>トップへ戻る</Button>   
    </div>
  );
}
export default Header