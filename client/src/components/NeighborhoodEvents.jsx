import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter,Link,Switch,Route,useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


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
        <div>
            <h1>Check out the neighborhood events</h1>
            {
                allEvents.map((event,i)=>{
                return (
                    <div style={{ width:"250px"}}>
                        <Card>
                            <Card.Img variant="top" src={event.picUrl} style={{ height:"280px", objectFit: "cover"}}/>
                            <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                {/* <Card.Text>{event.description}</Card.Text> */}
                                <Link key={i} to = {`/event/${event._id}`}><Button variant="primary">See Details</Button></Link>
                            </Card.Body>
                        </Card>
                    </div>
            )})
            }
        </div>
    )
}

export default NeighborhoodEvents;