import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import Responsive from './Responsive';
import ResponsiveB from './ResponsiveB';
import NeighborhoodsGrid from './NeighborhoodsGrid';

const Dashboard = () => {
    const history = useHistory()
    const [loggedinuser, setloggedinuser] = useState(null)
    const [allNeighborhoods, setAllNeighborhoods] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const italian = allEvents.filter(item => item.theme === "Italian")
    const eventsInMyNeigh = allEvents.filter(item => item.neighborhood_id === loggedinuser.neighborhood_id)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/loggedin", {withCredentials:true})
            .then(res=>{
                console.log("logged in user data",res)
                setloggedinuser(res.data.user)
            })
            .catch(err=>{
                console.log(err)
            })
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/neighborhoods")
            .then(response=>{
                console.log("response when getting all neighborhoods: ", response)
                setAllNeighborhoods(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/events")
            .then(response=>{
                console.log("response when getting all events: ", response)
                setAllEvents(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[])

    const buttonClick = () => {
        console.log(eventsInMyNeigh)
    }


    return (
        <div>
            {loggedinuser? <h6>Welcome {loggedinuser.username}!</h6>:<h6>Please log in</h6>}
            <h1 style={{fontWeight:"bold", textAlign:"left", color: "#484848"}}>Discover culinary events in Chicago</h1>
            <Responsive allNeighborhoods = {allNeighborhoods}/>
            <h1 style={{fontWeight:"bold", textAlign:"left", color: "#484848"}}>Discover culinary events</h1>
            <h1 style={{fontWeight:"bold", textAlign:"left", color: "#484848", marginTop:"-15px"}}>hosted by your neighbors</h1>
            <ResponsiveB eventsInMyNeigh = {eventsInMyNeigh}/>
            <NeighborhoodsGrid allNeighborhoods = {allNeighborhoods} eventsInMyNeigh = {eventsInMyNeigh} />
        </div>
    );
};


export default Dashboard;