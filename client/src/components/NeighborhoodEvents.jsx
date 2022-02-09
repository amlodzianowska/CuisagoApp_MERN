import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter,Link,Switch,Route,useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const NeighborhoodEvents = () => {
    const {neighborhoodId} = useParams();
    const [allEvents, setAllEvents] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/events/neighborhood/${neighborhoodId}`)
            .then(response=>{
                console.log("response when getting neighborhood events: ", response)
                setAllEvents(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[])


    return (
        <div>{allEvents[0].neighborhood_id?<h1>Check out the events in {allEvents[0].neighborhood_id.neighName}</h1>:""}
            
            <Grid className="mt-4" container spacing={2} justifyContent="center">
            {
            allEvents.map((e,i)=>{
            return (
                <div style={{ width:"250px"}}>
                    <Grid>
                        <Card sx={{ maxWidth: 200}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={e.picUrl}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography>{e.title}</Typography>
                            </CardContent>
                            <CardActions>
                            <Button href={`/event/${e._id}`} variant="secondary">SEE DETAILS</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </div>
            )})
            }
            </Grid>
        </div>
    )
}

export default NeighborhoodEvents;