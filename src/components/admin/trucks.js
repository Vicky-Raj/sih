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

import { ExpandMore,Loop,LocalShipping,CheckCircle } from "@material-ui/icons"
import {green} from "@material-ui/core/colors";

export default ()=>{
    const [trucks,setTrucks] = useState([]);
    const [success,setSuccess] = useState(false);

    const fetchTrucks = ()=>(
    axios.get(`${url}/truck`,{params:{status:"idle"}}).then((res)=>{
        setTrucks(res.data);
    }).catch((err)=>{
        console.log(err);
    }))

    useEffect(()=>{fetchTrucks()},[])

    const load = ()=>(
        axios.post(`${url}/truck`,{status:"loading"})
        .then(()=>{
            fetchTrucks();
            setSuccess(true);
        }).catch((err)=>{
            console.log(err);
        })
    );

    return (
        <div>
        <Typography variant="h4" style={{marginBottom:"1.5rem"}}>
                <span style={{display:"flex",alignItems:"center"}}>
                <LocalShipping style={{fontSize:40,marginRight:"1rem"}}/>
                Idle  Trucks: {trucks.length !== 0 && trucks.length}
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
                        style={{margin:"0.8rem"}} 
                        variant="contained" 
                        color="primary"
                        startIcon={<Loop/>}
                        onClick={load}>
                        load
                    </Button>
                </ExpansionPanelActions>
                </ExpansionPanel>
                </div>
            ))
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
                Truck1 added to loading stage
            </span>
        }
        />
        </Snackbar>
        </div>
    );
}