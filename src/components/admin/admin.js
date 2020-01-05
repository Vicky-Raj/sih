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
import {Menu,
        Create,
        CardTravel,
        Explore,
        LocalShipping,
        History as HistoryIcon
} from "@material-ui/icons"
import { BrowserRouter as Router,Link,Switch,Route,useRouteMatch,useLocation } from "react-router-dom";

import Writer from "./writer"
import Loading from "./loading"
import Travel from "./travel"
import Trucks from "./trucks"
import History from "./history"
import Product from "./product";




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
        <Create/>
      </ListItemIcon>
      <ListItemText primary={"Writer"}/>
    </ListItem>
    <ListItem button component={Link} to={`${url}/trucks`} selected={pathname === `${url}/trucks`}>
      <ListItemIcon>
        <LocalShipping/>
      </ListItemIcon>
      <ListItemText primary={"Trucks"}/>
    </ListItem>
    <ListItem button component={Link} to={`${url}/loading`} selected={pathname === `${url}/loading`}>
      <ListItemIcon>
        <CardTravel/>
      </ListItemIcon>
      <ListItemText primary={"Loading"}/>
    </ListItem>
    <ListItem button component={Link} to={`${url}/travel`} selected={pathname === `${url}/travel`}>
      <ListItemIcon>
        <Explore/>
      </ListItemIcon>
      <ListItemText primary={"Travel"}/>
    </ListItem>
    <ListItem button component={Link} to={`${url}/history`} selected={pathname === `${url}/history`}>
      <ListItemIcon>
        <HistoryIcon/>
      </ListItemIcon>
      <ListItemText primary={"History"}/>
    </ListItem>
    <Divider/>
  </List>
  );
}

export default function Admin() {
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
            Admin
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
                <Writer/>
              </Route>
              <Route  path={`${path}/loading`}>
                <Loading/>
              </Route>
              <Route path={`${path}/travel`}>
                <Travel/>
              </Route>
              <Route path={`${path}/trucks`}>
                <Trucks/>
              </Route>
              <Route path={`${path}/history`}>
                <History/>
              </Route>
              <Route  path={`${path}/product/:id`}> 
                <Product/>
             </Route>
            </Switch>
        </main>
    </div>
    </Router>
    );
}