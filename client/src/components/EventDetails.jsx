import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter,Link,Switch,Route,useHistory } from "react-router-dom";
import { useParams } from "react-router";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';


const EventDetail = () => {
    const [submitToggle, setSubmitToggle] = useState(false);
    const {id} = useParams();
    const [oneEvent, setOneEvent] = useState({})
    const [loggedinuser, setloggedinuser] = useState(null)
    const history = useHistory();
    const [matcher, setMatcher] = useState(false)
    const [comment,setComment] = useState({
        text:"",
        event_id: "",
        author_id: ""
    })
    const [guest, setGuest] = useState({
        guest_id: "",
        event_id: ""
    })
    const [commentErrors, setCommentErrors] = useState({
        text: ""
    })
    const [allComments, setAllComments] = useState([])
    const [allGuests, setAllGuests] = useState([])

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
                setComment({
                    ...comment,
                    event_id: response.data.results._id,
                    author_id: loggedinuser._id
                })
                setGuest({
                    event_id: response.data.results._id,
                    guest_id: loggedinuser._id
                })
                console.log("comment: ", comment)
            })
            .catch(err=>console.log("error: ", err))
    },[loggedinuser])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/guests/event/${oneEvent._id}`)
            .then(response=>{
                console.log("response when getting all event's guests: ", response)
                setAllGuests(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[submitToggle])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comments/event/${oneEvent._id}`)
            .then(response=>{
                console.log("response when getting all event's comments: ", response)
                setAllComments(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[submitToggle])


    const deleteEvent = ()=>{
        axios.delete(`http://localhost:8000/api/events/${id}`)
            .then(response=>{
                console.log("response when deleting one event: ", response)
                history.push("/dashboard")
            })
            .catch(err=>console.log("error: ", err))
    }

    const joinEvent = (e)=>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/guests`, guest)
            .then(response=>{
                console.log("response when joining an event: ", response)
                setSubmitToggle(!submitToggle)
            })
            .catch(err=>console.log("error: ", err))
    }

    const changeHandler = (e)=>{
        setComment({
            ...comment,
            text: e.target.value,
            event_id: oneEvent._id,
            author_id: loggedinuser._id
        })
    }

    const postComment = (e) => {
        e.preventDefault()
        console.log(comment)
        axios.post("http://localhost:8000/api/comments", comment)
            .then(response=>{
                if(response.data.err){ //if the form is not filled out properly
                    console.log("post comment error", response.data.err.errors)
                    setCommentErrors(response.data.err.errors)
                }else{
                    setSubmitToggle(!submitToggle)
                    setComment({
                        ...comment,
                    text:""
                    })
                }
            })
            .catch(err=>console.log({err}))
    }
    

    return (
        <div className="container">
            <Typography variant="h3">{oneEvent.title}</Typography>
            <img src={oneEvent.picUrl} alt="Event" height="200px"/>
            {oneEvent.host_id?<Typography variant="h6">Event hosted by {oneEvent.host_id.username}</Typography>:<Typography variant="h4">Event hosted by </Typography>}
            {oneEvent.host_id?<Avatar alt={oneEvent.host_id.username} src={oneEvent.host_id.profilePicUrl} />:""}
            <h4>Event date: {moment(oneEvent.startDate).format("MMM Do, YY")}</h4>
            {matcher?<button onClick={deleteEvent} className="btn btn-danger">Delete</button>:<button onClick={joinEvent} className="btn btn-info">Join Event</button>}
            {/* <button onClick={joinEvent} className="btn btn-danger">Join Event</button> */}
            {
            allComments==undefined?<p>No comments yet!</p>:allComments.map((comment,i)=>{
                return (
                    <div key={i}>
                        <p>{comment.text}</p>
                        <p>{comment.author_id.username}</p>
                    </div>
                )})
            }
            {
            allGuests==undefined?<p>No Guests yet!</p>:allGuests.map((guest,i)=>{
                return (
                    <>
                        <p text="danger" key={i}>{guest.guest_id.username}</p>
                    </>
                )})
            }
            <TextField onChange={changeHandler} placeholder="Add a comment..." variant="outlined" color="secondary" rows={2} tyle="date" value={comment.text}></TextField>
            <Button round onClick={postComment} startIcon={<Add/>} variant="outlined" color="secondary"/>
            
        </div>
    )
}

export default EventDetail;