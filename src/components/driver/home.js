import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Snackbar,SnackbarContent, Button} from "@material-ui/core"
import axios from 'axios';
import {url} from "../../App"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps"
import {red,green} from "@material-ui/core/colors";
import io from "socket.io-client";
import {Error,CheckCircle} from "@material-ui/icons";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
    const pathCoordinates1 = [
        { lat: 11.004556, lng: 76.961632 },
        { lat: 11.342423, lng: 77.728165 }
    ]
    const pathCoordinates2 = [
        { lat: 11.342423, lng: 77.728165 },
        {lat:props.to[0],lng:props.to[1]}
    ]
    return(
    <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: 11.004556, lng: 76.961632 }}
    >
        <Marker label="Warehouse" style={{color:"green"}} position={{ lat: 11.004556, lng: 76.961632 }}/>
        <Marker label="Truck1" style={{color:"green"}} position={{ lat: 11.342423, lng: 77.728165 }}/>
        <Marker label="Destination" position={{ lat: props.to[0], lng: props.to[1]}} />
        <Marker label="ahah" position={{ lat: 13.067439, lng:  80.237617}} />
        <Polyline
            path={pathCoordinates1}
            geodesic={true}
            options={props.missing ? {
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
            }:{
                strokeColor: "green",
                strokeOpacity: 1,
                strokeWeight: 2,
            }}
        />
        {
        !props.missing &&
        <Polyline
            path={pathCoordinates2}
            geodesic={true}
            options={{
                strokeColor: "red",
                strokeOpacity: 0.75,
                strokeWeight: 2,
            }}
        />
        }
    </GoogleMap>
  )}))

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable() {
    const classes = useStyles();
    const [product,setProduct] = useState(null);
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        const socket = io(url);
        axios.get(`${url}/truck`,{params:{status:"travel"}}).then((res)=>{
            if(res.data.length > 0)setProduct(res.data[0].product)
            socket.on("new",(data)=>{
                if(data.length === 0) return setProduct(null);
                setProduct(data[0].product)
            })
        })
    return ()=>socket.close();
    },[])

    const arrived = ()=>{
        axios.post(`${url}/truck`,{status:"arrived"}).then(()=>{
            setSuccess(true);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
    <div>
    {
    product &&
    <div>
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right">Arrival Date</TableCell>
                <TableCell align="right">Status</TableCell>
                {
                    product.status !== "missing" &&
                <TableCell align="right">Arrived</TableCell>
                }
            </TableRow>
        </TableHead>
        <TableBody>
            {
            product.status === "missing" ?
            <TableRow>
                <TableCell component="th" scope="row" style={{backgroundColor:red[300]}}>
                {product.name}
                </TableCell>
                <TableCell align="right" style={{backgroundColor:red[300]}}>{product.to}</TableCell>
                <TableCell align="right" style={{backgroundColor:red[300]}}>{product.arrivalDate}</TableCell>
                <TableCell align="right" style={{backgroundColor:red[300]}}>{product.status}</TableCell>
            </TableRow>:
            <TableRow>
                <TableCell component="th" scope="row">
                {product.name}
                </TableCell>
                <TableCell align="right">{product.to}</TableCell>
                <TableCell align="right">{product.arrivalDate}</TableCell>
                <TableCell align="right">{product.status}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={arrived}>
                        arrived
                    </Button>
                </TableCell>
            </TableRow>
            }
        </TableBody>
        </Table>
    </TableContainer>
    <div style={{width:"70vw",margin:"0 auto",height:"600px",marginTop:"2rem"}}>
    <MyMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyBRMxmWyTA2yeYIA6kh6aUWIKBPR6Xm8mw"}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        to={product.toCord}
        missing={product.status === "missing"}
    />
    </div>
    <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"center"}}
        open={product.status === "missing"}
        onClose={()=>{}}>
        <SnackbarContent
        style={{backgroundColor:red[600]}}
        message={
            <span style={{display:"flex",alignItems:"center"}}>
                <Error style={{fontSize:20,marginRight:"1rem"}}/>
                 Product {product.name} is missing
            </span>
        }
        />
    </Snackbar>
    </div>
    }
    <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"center"}}
        open={success}
        autoHideDuration={5000}
        onClose={()=>setSuccess(false)}>
        <SnackbarContent
        style={{backgroundColor:green[600]}}
        message={
            <span style={{display:"flex",alignItems:"center"}}>
                <CheckCircle style={{fontSize:20,marginRight:"1rem"}}/>
                Product arrived
            </span>
        }
        />
    </Snackbar>
    </div>
    );
}
