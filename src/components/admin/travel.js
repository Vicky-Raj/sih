import React,{useEffect,useState} from "react";
import axios from "axios";
import { url } from "../../App";
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    SnackbarContent,
    Button
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors"
import {green} from "@material-ui/core/colors";
import { ExpandMore,LocalShipping,Cancel,Error} from "@material-ui/icons"
import io from "socket.io-client";
import {useHistory} from "react-router-dom";

const styles = makeStyles({
    trow:{
        "&:hover":{
            cursor:"pointer"
        }   
    }
})

export default ()=>{

    const classes = styles();
    const history = useHistory();

    const [trucks,setTrucks] = useState([]);

    const fetchTrucks = ()=>(
    axios.get(`${url}/truck`,{params:{status:"travel"}}).then((res)=>{
        setTrucks(res.data);
    }).catch((err)=>{
        console.log(err);
    }))


    const cancel = ()=>(
        axios.post(`${url}/truck`,{status:"idle"})
        .then(fetchTrucks)
        .catch((err)=>console.log(err))
    );

    useEffect(()=>{
        fetchTrucks();
        
        const socket = io(url);
        socket.on("new",(data)=>{
            setTrucks(data);
        })

        return ()=>socket.close();
    },[]);
    
    return (
        <div>
        <Typography variant="h4" style={{marginBottom:"1.5rem"}}>
                <span style={{display:"flex",alignItems:"center"}}>
                <LocalShipping style={{fontSize:40,marginRight:"1rem"}}/>
                Travelling Trucks: {trucks.length !== 0 && trucks.length}
                </span>
        </Typography>
        {
            trucks.map((truck)=>(
                <div style={{width:"100%"}} key={truck.name}>
                <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{backgroundColor:truck.product.status === "missing" ? red[300]: null}}
                >
                <Typography variant="h6">{truck.name}</Typography>
                </ExpansionPanelSummary>
                <Typography variant="subtitle2" style={{marginLeft:"24px"}}>Product Details:</Typography>
                <ExpansionPanelDetails>
                    <TableContainer>
                        <Table aria-label="simple table">
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
                                <TableRow hover={true} classes={{hover:classes.trow}} onClick={()=>history.replace(`product/${truck.product._id}`)}>
                                <TableCell style={{backgroundColor:red[300]}}>1</TableCell>
                                <TableCell style={{backgroundColor:red[300]}}>{truck.product.name}</TableCell>
                                <TableCell align="right" style={{backgroundColor:red[300]}}>{truck.product.to}</TableCell>
                                <TableCell align="right" style={{backgroundColor:red[300]}}>{truck.product.arrivalDate}</TableCell>
                                <TableCell align="right" style={{backgroundColor:red[300]}}>{truck.product.status}</TableCell>
                                </TableRow>:
                                <TableRow hover={true} classes={{hover:classes.trow}} onClick={()=>history.replace(`product/${truck.product._id}`)}>
                                <TableCell style={{backgroundColor:green[300]}}>1</TableCell>
                                <TableCell style={{backgroundColor:green[300]}}>{truck.product.name}</TableCell>
                                <TableCell align="right" style={{backgroundColor:green[300]}}>{truck.product.to}</TableCell>
                                <TableCell align="right" style={{backgroundColor:green[300]}}>{truck.product.arrivalDate}</TableCell>
                                <TableCell align="right" style={{backgroundColor:green[300]}}>{truck.product.status}</TableCell>
                                </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
                <Typography variant="subtitle2" style={{marginLeft:"24px"}}>Truck Details:</Typography>
                <ExpansionPanelDetails>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Truck Name</TableCell>
                                <TableCell align="right">Registartion Plate</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{truck.name}</TableCell>
                                    <TableCell align="right">{truck.reg}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
                <Typography variant="subtitle2" style={{marginLeft:"24px"}}>Driver Details:</Typography>
                <ExpansionPanelDetails>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Driver Name</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">License No.</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{truck.driver.name}</TableCell>
                                    <TableCell align="right">{truck.driver.phoneNum}</TableCell>
                                    <TableCell align="right">{truck.driver.address}</TableCell>
                                    <TableCell align="right">{truck.driver.age}</TableCell>
                                    <TableCell align="right">{truck.driver.licenseNo}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button 
                        style={{margin:"0.8rem",backgroundColor:red[600]}} 
                        variant="contained" 
                        color="primary"
                        startIcon={<Cancel/>}
                        onClick={cancel}
                        >
                        Cancel
                    </Button>
                </ExpansionPanelActions>
                </ExpansionPanel>
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