import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {url} from "../../App"
import {useHistory} from "react-router-dom";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable() {
    const classes = useStyles();
    const [products,setProducts] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        axios.get(`${url}/product/history`).then(res=>{
            setProducts(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    return (
    <div>
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Truck</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right">Arrival Date</TableCell>
                <TableCell align="right">Status</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {
        products.map((product,index)=>(
            <TableRow key={product._id} hover onClick={()=>history.push(`product/${product._id}`)}>
                <TableCell>{index+1}</TableCell>
                <TableCell>Truck1</TableCell>
                <TableCell component="th" scope="row">
                {product.name}
                </TableCell>
                <TableCell align="right" >{product.to}</TableCell>
                <TableCell align="right" >{product.arrivalDate}</TableCell>
                <TableCell align="right" >{product.status}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
    </TableContainer>
    </div>
    );
}
