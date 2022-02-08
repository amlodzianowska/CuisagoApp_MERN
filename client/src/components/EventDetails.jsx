import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter,Link,Switch,Route,useHistory } from "react-router-dom";
import { useParams } from "react-router";
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EventDetail = () => {
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
    const [commentErrors, setCommentErrors] = useState({
        text: ""
    })
    const [allComments, setAllComments] = useState([])

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
                console.log("comment: ", comment)
            })
            .catch(err=>console.log("error: ", err))
    },[loggedinuser])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comments/event/${oneEvent._id}`)
            .then(response=>{
                console.log("response when getting all event's comments: ", response)
                setAllComments(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[oneEvent])

    const deleteEvent = ()=>{
        axios.delete(`http://localhost:8000/api/events/${id}`)
            .then(response=>{
                console.log("response when deleting one event: ", response)
                history.push("/")
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
                    setComment({
                        ...comment,
                    text:""
                    })
                    //if there's any existing previouse error messages, clear them out upon submittal
                    setCommentErrors({
                        text: ""
                    })
                }
            })
            .catch(err=>console.log({err}))
    }
    

    return (
        <div className="container">
            <h1>Hello</h1>
            <h3>{oneEvent.title}</h3>
            <img src="https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1-500x500.jpg" alt="Event" height="200px"/>
            <h4>Event date: {moment(oneEvent.startDate).format("MMM Do, YY")}</h4>
            {matcher?<button onClick={deleteEvent} className="btn btn-danger">Delete</button>:<button className="btn btn-info">Join Event</button>}
            {/* {loggedinuser?<button onClick={deleteEvent} className="btn btn-danger">Delete</button>:<button className="btn btn-info">Join Event</button>} */}
            {
            allComments==undefined?<p>No comments yet!</p>:allComments.map((comment,i)=>{
                return (
                    <>
                        <p key={i}>{comment.text}</p>
                        <p key={i}>{comment.author_id.username}</p>
                    </>
                )})
            }
            <Form >
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control onChange={changeHandler} as="textarea" rows={3} ></Form.Control>
                </Form.Group>
            </Form>
            <Button onClick={postComment} variant="light">Comment</Button>
            
        </div>
    )
}

export default EventDetail;