import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';


const ResponsiveB = () => {
    const history = useHistory()
    const [loggedinuser, setloggedinuser] = useState(null)
    const [allNeighborhoods, setAllNeighborhoods] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const italian = allEvents.filter(item => item.theme === "Italian")
    const eventsInMyNeigh = allEvents.filter(item => item.neighborhood_id === loggedinuser.neighborhood_id)

    
    return (
        <>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={8} sm={6}>
                <Paper style={{objectFit: "cover", backgroundImage: `url(https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1-500x500.jpg)`, height:75, width:`100%`}}/>
                </Grid>
                <Grid item xs={8} sm={6}>
                <Paper style={{height:75, width:`100%`}}/>
                </Grid>
                <Grid item xs={8} sm={6}>
                <Paper style={{height:75, width:`100%`}}/>
                </Grid>
            </Grid>
            {/* <Slider {...settings} style={{width:"90%", marginLeft:"90px"}}>
            {this.props.eventsInMyNeigh.map((e,i)=>{
                return (
                    <Link key={i} to = {`/events/neighborhood/${e._id}`}>
                        <div style={{margin:"10px", width:"230px", textDecoration:"none"}}>
                            <Card style={{borderRadius:"15px", textDecoration:"none", boxShadow:"5px 5px 13px 5px lightgrey"}}>
                                <Card.Img variant="top" src="https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1-500x500.jpg" style={{borderRadius:"15px 15px 0 0", height:"220px", objectFit: "cover"}}/>
                                <Card.Body style={{ color:"black", textDecoration:"none"}}>
                                    <Card.Title style={{ color:"black", textDecoration:"none"}}>{e.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </Link>
            )})
            }
            </Slider> */}
        </>
    );
}

export default ResponsiveB;