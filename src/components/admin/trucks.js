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

import { ExpandMore,Loop } from "@material-ui/icons"

export default ()=>{
    const [trucks,setTrucks] = useState([]);

    useEffect(()=>{
        axios.get(`${url}/truck`,{params:{status:"idle"}}).then((res)=>{
            setTrucks(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <div>
        <Typography variant="h4" style={{marginBottom:"1.5rem"}}>
                Idle  Trucks: {trucks.length !== 0 && trucks.length}
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
                        startIcon={<Loop/>}>
                        load
                    </Button>
                </ExpansionPanelActions>
                </ExpansionPanel>
                </div>
            ))
        }

        </div>
    );
}