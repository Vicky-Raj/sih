import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Snackbar,SnackbarContent} from "@material-ui/core"
import axios from 'axios';
import {url} from "../../App"
import {red} from "@material-ui/core/colors";
import {Error} from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable() {
    const classes = useStyles();
    const [trucks,setTrucks] = useState([]);

    useEffect(()=>{
        axios.get(`${url}/truck`,{params:{status:"travel"}}).then(res=>{
            setTrucks(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    return (
    <div>
    {
    trucks.map((truck,index)=>(
    <div>
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right">Arrival Date</TableCell>
                <TableCell align="right">Status</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
            truck.product.status === "missing" ?
            <TableRow>
                <TableCell style={{backgroundColor:red[300]}}>{index+1}</TableCell>
                <TableCell component="th" scope="row" style={{backgroundColor:red[300]}}>
                {truck.product.name}
                </TableCell>
                <TableCell align="right" style={{backgroundColor:red[300]}}>{truck.product.to}</TableCell>
                <TableCell align="right" style={{backgroundColor:red[300]}}>{truck.product.arrivalDate}</TableCell>
                <TableCell align="right" style={{backgroundColor:red[300]}}>{truck.product.status}</TableCell>
            </TableRow>:
            <TableRow>
                <TableCell>{index+1}</TableCell>
                <TableCell component="th" scope="row">
                {truck.product.name}
                </TableCell>
                <TableCell align="right">{truck.product.to}</TableCell>
                <TableCell align="right">{truck.product.arrivalDate}</TableCell>
                <TableCell align="right">{truck.product.status}</TableCell>
            </TableRow>
            }
        </TableBody>
        </Table>
    </TableContainer>
    <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"center"}}
        open={truck.product.status === "missing"}
        onClose={()=>{}}>
        <SnackbarContent
        style={{backgroundColor:red[600]}}
        message={
            <span style={{display:"flex",alignItems:"center"}}>
                <Error style={{fontSize:20,marginRight:"1rem"}}/>
                 Product {truck.product.name} is missing
            </span>
        }
        />
    </Snackbar>
    </div>
    ))
    }
    </div>
    );
}
