import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter,Link,Switch,Route,useHistory } from "react-router-dom";
import { useParams } from "react-router";
import moment from 'moment';

const EventDetail = () => {
    const {id} = useParams();
    const [oneEvent, setOneEvent] = useState({})
    const [loggedinuser, setloggedinuser] = useState(null)
    const history = useHistory();
    const [matcher, setMatcher] = useState(false)

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
        axios.get(`http://localhost:8000/api/event/${id}`)
            .then(response=>{
                console.log("response when getting one event: ", response)
                setOneEvent(response.data.results)
                if (loggedinuser._id==response.data.results.host_id._id){
                    setMatcher(true)
                }
            })
            .catch(err=>console.log("error: ", err))
    },[])

    const deleteEvent = ()=>{
        axios.delete(`http://localhost:8000/api/events/${id}`)
            .then(response=>{
                console.log("response when deleting one event: ", response)
                history.push("/")
            })
            .catch(err=>console.log("error: ", err))
    }

    return (
        <div>
            <h1>Hello</h1>
            <h3>{oneEvent.title}</h3>
            <img src="https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1-500x500.jpg" alt="Event" height="200px"/>
            <h4>Event date: {moment(oneEvent.startDate).format("MMM Do, YY")}</h4>
            {matcher?<button onClick={deleteEvent} className="btn btn-danger">Delete</button>:<button className="btn btn-info">Join Event</button>}
            {/* {loggedinuser?<button onClick={deleteEvent} className="btn btn-danger">Delete</button>:<button className="btn btn-info">Join Event</button>} */}
            
        </div>
    )
}

export default EventDetail;