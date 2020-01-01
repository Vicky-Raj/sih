import React,{useState} from "react"
import {
    Typography,
    Paper,
    TextField,
    CircularProgress,
    Button
} from "@material-ui/core"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers" 
import {
    Create
} from "@material-ui/icons"
import DateFnsUtils from '@date-io/date-fns';

import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import {url} from "../../App";



export default ()=>{

    const [date,setDate] = useState(new Date());
    const [name,setName] = useState(null);
    const [to,setTo] = useState(null);
    const [loading,setLoading] = useState(false);


    const places = [
        {name:"Chennai",lat:13.067439,long:80.237617},
        {name:"Salem",lat:11.664325,long:78.146011},
        {name:"Madurai",lat:9.939093,long:78.121719},
        {name:"Tirunelveli",lat:8.741222,long:77.694626}
    ]

    const submit = ()=>{
        axios.post(`${url}/product`,{name,to,date}).then(()=>{})
    }

    return(
        <>
            <Typography variant="h4" style={{marginBottom:"0.8rem"}}>Writer</Typography>
            <Paper style={{width:"80vh",margin:"0 auto",padding:"0.8rem"}}>
            <form noValidate autoComplete="off" style={{textAlign:"center"}}>
                <Typography variant="h4">Product Details</Typography>
                <TextField
                variant="outlined"
                label="Product Name"
                margin="normal"
                fullWidth
                value={name}
                onChange={e=>setName(e.target.value)}
                />
                <Autocomplete
                options={places}
                getOptionLabel={place=>place.name}
                value={to}
                onChange={(e,value)=>setTo(value)}
                renderInput={params=>(
                    <TextField {...params} label="To" variant="outlined" fullWidth margin="normal"/>
                )}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    fullWidth
                    margin="normal"
                    label="Arrival Date"
                    format="dd/MM/yyyy"
                    value={date}
                    onChange={date=>setDate(date)}
                    />
                </MuiPickersUtilsProvider>
                {loading ?  
                <CircularProgress style={{margin:"1.4rem"}}/>
                :
                <Button 
                size="large" 
                variant="contained" 
                color="primary" 
                startIcon={<Create/>}
                style={{margin:"1.5rem"}}
                onClick={submit}>
                    Write
                </Button>
                }               
            </form>
            </Paper>
        </>
    );
}