import React,{useState} from "react"
import {
    Typography,
    Paper,
    TextField,
    CircularProgress,
    Snackbar,
    SnackbarContent,
    Button
} from "@material-ui/core"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers" 
import {
    Create,
    CheckCircle,
    Error
} from "@material-ui/icons"
import DateFnsUtils from '@date-io/date-fns';

import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import {url} from "../../App";
import {green,red} from "@material-ui/core/colors"



export default ()=>{

    const [date,setDate] = useState(new Date());
    const [name,setName] = useState("");
    const [to,setTo] = useState("");
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);


    const places = [
        {name:"Chennai",lat:13.067439,long:80.237617},
        {name:"Salem",lat:11.664325,long:78.146011},
        {name:"Madurai",lat:9.939093,long:78.121719},
        {name:"Tirunelveli",lat:8.741222,long:77.694626}
    ]

    const submit = ()=>{
        setLoading(true);
        axios.post(`${url}/product`,{name,to,date})
        .then(()=>{
            setLoading(false);
            setSuccess(true);
        })
        .catch(()=>{
            setLoading(false);
            setError(true);
        })
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
                    Details Written
                </span>
            }
            />
            </Snackbar>
            <Snackbar
            anchorOrigin={{vertical:"top",horizontal:"center"}}
            open={error}
            autoHideDuration={5000}
            onClose={()=>setError(false)}>
            <SnackbarContent
            style={{backgroundColor:red[600]}}
            message={
                <span style={{display:"flex",alignItems:"center"}}>
                    <Error style={{fontSize:20,marginRight:"1rem"}}/>
                    Writing Failed
                </span>
            }
            />
            </Snackbar>
            </Paper>
        </>
    );
}