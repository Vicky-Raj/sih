import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { IconButton, Divider} from "@material-ui/core"
import {
  Home as HomeIcon,
  ListAlt,
  Menu
} from "@material-ui/icons"
import { BrowserRouter as Router,Link,Switch,Route,useRouteMatch,useLocation } from "react-router-dom";

import Home from "./home";
import Products from "./products"



const drawerWidth = 215;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menu:{
    marginRight:theme.spacing(1.5)
  },
  toolbar: theme.mixins.toolbar,
}));


const NavBar = ({url})=>{
  const {pathname} = useLocation();
  return(
    <List>
    <ListItem button component={Link} to={url} selected={pathname === url}>
      <ListItemIcon>
        <HomeIcon/>
      </ListItemIcon>
      <ListItemText primary={"Home"}/>
    </ListItem>
    <ListItem button component={Link} to={`${url}/products`} selected={pathname === `${url}/products`}>
      <ListItemIcon>
        <ListAlt/>
      </ListItemIcon>
      <ListItemText primary={"Products"}/>
    </ListItem>
    <Divider/>
  </List>
  );
}

export default function Driver() {
    const classes = useStyles();
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down("sm"));
    const [open,setOpen] = useState(false);
    const {url,path} = useRouteMatch();
    useEffect(()=>{
        if(!small)setOpen(false);
    },[small])

    return (
    <Router>
    <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>{
            small && 
            <IconButton className={classes.menu} color="inherit" edge="start" onClick={()=>setOpen(true)}>
                <Menu/>
            </IconButton>
            }
            <Typography variant="h6" noWrap>
            Driver
            </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant={small ? "temporary" : "permanent"}
        open={open}
        onClose={()=>setOpen(false)}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
        <div className={small ? null : classes.toolbar} />
        <NavBar url={url}/>
        </Drawer>
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <Switch>
              <Route exact path={path}>
                <Home/>
              </Route>
              <Route  path={`${path}/products`}>
                <Products/>
              </Route>
            </Switch>
        </main>
    </div>
    </Router>
    );
}