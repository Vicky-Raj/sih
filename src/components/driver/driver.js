import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {Menu} from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

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

export default function ClippedDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down("xs"));
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        if(!small)setOpen(false);
    },[small])

    return (
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
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text} selected={true}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        </Drawer>
        <main className={classes.content}>
        <div className={classes.toolbar} />
              
        </main>
    </div>
    );
}