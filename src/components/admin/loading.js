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
    Button
} from "@material-ui/core"

import { red } from "@material-ui/core/colors"

import { ExpandMore,LocalShipping,Cancel,CheckCircle } from "@material-ui/icons"

export default ()=>{
    const [trucks,setTrucks] = useState([]);
    const [products,setProducts] = useState([]);

    const fetchTrucks = ()=>(
    axios.get(`${url}/truck`,{params:{status:"loading"}}).then((res)=>{
        setTrucks(res.data);
    }).catch((err)=>{
        console.log(err);
    }))

    const fetchProducts = ()=>(
        axios.get(`${url}/product`,{params:{status:"loading"}}).then((res)=>{
            setProducts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    )

    const cancel = ()=>(
        axios.post(`${url}/truck`,{status:"idle"})
        .then(()=>{
            fetchTrucks();
        }).catch((err)=>{
            console.log(err);
        })
    );

    const startTrip = ()=>(
        axios.post(`${url}/truck`,{status:"travel"})
        .then(fetchTrucks)
        .catch((err)=>{
            console.log(err);
        })
    );

    useEffect(()=>{
        fetchTrucks()
        fetchProducts();
        const poll = setInterval(fetchProducts,1000);
        return ()=>clearInterval(poll);
    },[])
    
    return (
        <div>
        <Typography variant="h4" style={{marginBottom:"1.5rem"}}>
                <span style={{display:"flex",alignItems:"center"}}>
                <LocalShipping style={{fontSize:40,marginRight:"1rem"}}/>
                Loading Trucks: {trucks.length !== 0 && trucks.length}
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
                                products.map((product,index)=>(
                                    <TableRow>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.to}</TableCell>
                                    <TableCell align="right">{product.arrivalDate}</TableCell>
                                    <TableCell align="right">{product.status}</TableCell>
                                    </TableRow>
                                ))
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
                        onClick={cancel}>
                        Cancel
                    </Button>
                    <Button 
                        style={{margin:"0.8rem"}} 
                        variant="contained" 
                        color="primary"
                        startIcon={<CheckCircle/>}
                        onClick={startTrip}
                        >
                        Start Trip
                    </Button>
                </ExpansionPanelActions>
                </ExpansionPanel>
                </div>
            ))
        }

        </div>
    );
}