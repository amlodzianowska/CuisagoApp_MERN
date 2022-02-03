import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import styles from './CreateEvent.module.css';
import Navbar from './Navbar';
import moment from 'moment'

const CreateEvent = () => {
    const history = useHistory();
    const [loggedinuser, setloggedinuser] = useState(null)
    const [loggedinId, setLoggedinId] = useState("");
    const [allNeighborhoods, setAllNeighborhoods] = useState([])
    const [oneNeighborhoodId, setoOneNeighborhoodId] = useState("")
    const [oneNeighborhood, setOneNeighborhood] = useState({
        neighName: "",
        url: ""
    })
    const allCuisines = ["American", "Turkish", "French", "Chinese", "Japanese", "Indian", "Italian", "Greek", "Spanish", "Polish", "Mediterranean", "Mexican", "Brazilian", "Vegetarian", "Vegan", "Other"].sort()
    const dateToday = new Date()
    const [formInfo,setFormInfo] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        neighborhood_id: "",
        theme: "",
        description: "",
        isPaid: false,
        price: "",
        host_id: ""
    })
    const [formErrors, setFormErrors] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        theme: "",
    })
    const [endDate, setEndDate] = useState({
        end : false
    })
    const [next, setNext] = useState({
        next : true
    })
    
    useEffect(()=>{
        if (oneNeighborhoodId==""){
            console.log("No id yet")
        }else{
            axios.get(`http://localhost:8000/api/neighborhoods/${oneNeighborhoodId}`)
                .then(response=>{
                    console.log("response when getting one neighborhood: ", response)
                    setOneNeighborhood(response.data.results)
                })
                .catch(err=>console.log("error: ", err))
        }
    },[oneNeighborhoodId])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/loggedin", {withCredentials:true})
        .then(res=>{
            console.log("logged in user data",res)
            setloggedinuser(res.data.user)
            setLoggedinId(res.data.user._id)
            setFormInfo({
                ...formInfo,
                host_id: loggedinId
        })
    })
        .catch(err=>{
            console.log(err)
        })
    }, [loggedinId])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/neighborhoods")
            .then(response=>{
                console.log("response when getting all neighborhoods: ", response)
                setAllNeighborhoods(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[])
    
    


    const changeHandler = (e)=>{
        // formatting time from input to a 12 hour standard
        if (e.target.name == "startTime" || e.target.name == "endTime"){
            var time = e.target.value.split(":")
            if (time[0]> 12){
                var hour = time[0] - 12
                var timeFinal = hour + ":" + time[1] + " PM"
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: timeFinal
            })
            }else if (time[0]<= 12){
                var timeFinal = time[0] + ":" + time[1] + " AM"
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: timeFinal
            })}
        // the rest of the form fields (other than time fields)
        }
        else if(e.target.type==="checkbox"){
            setFormInfo({
                ...formInfo,
                [e.target.name]: !formInfo.isPaid
            })
        }else{
            if (e.target.name == "neighborhood"){
                setFormInfo({
                    ...formInfo,
                    neighborhood_id: e.target.value
                })
                setoOneNeighborhoodId(e.target.value)
            }else{
                setFormInfo({
                    ...formInfo,
                    [e.target.name]: e.target.value
                })
            }
        }
    }

    const createEvent = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/events", formInfo)
            .then(response=>{
                if(response.data.err){ //if the form is not filled out properly
                    console.log("create event error", response.data.err.errors)
                    setFormErrors(response.data.err.errors)
                }else{
                    setFormInfo({
                        title: "",
                        startDate: "",
                        endDate: "",
                        startTime: "",
                        endTime: "",
                        neighborhood_id: "",
                        theme: "",
                        description: "",
                        isPaid: false,
                        price: "",
                        host_id: ""
                    })
                    //if there's any existing previouse error messages, clear them out upon submittal
                    setFormErrors({
                        title: "",
                        startDate: "",
                        endDate: "",
                        startTime: "",
                        endTime: "",
                        neighborhood: "",
                        theme: ""
                    })
                    history.push("/dashboard")
                }
            })
            .catch(err=>console.log({err}))
    }

    const endDateAdd = (e) => {
        if (endDate.end == true){
            setEndDate({
                ...endDate,
                end : false
            })
        }else{
            setEndDate({
                ...endDate,
                end : true
            })
        }
    }

    const movenext = (e) => {
        if (next.next == true){
            setNext({
                ...next,
                next : false
            })
        }else{
            setNext({
                ...next,
                next : true
            })
        }
    }



    return (
        <div className={ styles.backgroundColor }>
            <Navbar/>
            <div className="container" style = {{marginTop:"20px"}}>
                <div className="row">
                    <div className="col-4">
                        <form onSubmit={createEvent} className="container" className={styles.formBox}>
                            {next.next?
                                <div>
                                    <div className="form-group">
                                        <label class="d-flex justify-content-start">Title*:</label>
                                        <input onChange={changeHandler} type="text" name="title" className="form-control" style = {{marginTop: "5px"}} value={formInfo.title} placeholder="Event name" />
                                        <p className="text-danger">{formErrors.title?.message}</p>
                                    </div>
                                    <label class="d-flex justify-content-start">Start Date and Time*:</label>
                                    <div className="row">
                                        <div className="col-7">
                                            <div className="form-group">
                                                <input onChange={changeHandler} type="date" name="startDate" className="form-control" style = {{marginTop: "5px"}} value={formInfo.startDate} min={dateToday}/>
                                                {/* <p className="text-danger">{formErrors.startDate?.message}</p> */}
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="form-group">
                                                <input onChange={changeHandler} type="time" name="startTime" className="form-control" style = {{marginTop: "5px"}} value={formInfo.startTime} />
                                                {/* <p className="text-danger">{formErrors.startTime?.message}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {endDate.end?
                                            <div>
                                                <label class="d-flex justify-content-start">End Time:</label>
                                                <div className="row">
                                                    {/* <div className="col-7">
                                                        <div className="form-group">
                                                            <input onChange={changeHandler} type="date" name="endDate" className="form-control" style = {{marginTop: "5px"}} value={formInfo.endDate}/>
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="col-5"> */}
                                                    <div className="form-group">
                                                        <input onChange={changeHandler} type="time" name="endTime" className="form-control" style = {{marginTop: "5px"}} value={formInfo.endTime} />
                                                    </div>
                                                    {/* </div> */}
                                                </div>
                                            </div>:
                                            <div> </div>
                                        }
                                    </div>
                                    <div className="mt-2">
                                        {endDate.end?
                                            <p className={ styles.endDateHover } onClick={endDateAdd}>-End Time</p>:
                                            <p className={ styles.endDateHover } onClick={endDateAdd}>+End Time</p>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label class="d-flex justify-content-start">Neighborhood:</label>
                                        <select onChange={changeHandler} className="form-select" style = {{marginTop: "5px"}} aria-label="Default select example" name="neighborhood">
                                            <option value="">Choose your neighborhood</option>
                                            {
                                                allNeighborhoods.map((neigh, i)=>{
                                                    return (
                                                        <option key = {i} value={neigh._id}>{neigh.neighName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <p className="text-danger">{formErrors.password?.message}</p> */}
                                    </div>
                        
                                    <button onClick={movenext} className="btn btn-danger mt-3">Next</button>
                                </div>:
                                    <div>
                                        <div>
                                            <div className="mt-3 form-group">
                                                <label class="d-flex justify-content-start">Description*:</label>
                                                <textarea onChange={changeHandler} name="description" class="form-control" style = {{marginTop: "5px"}} rows="5">{formInfo.description}</textarea>
                                                <p className="text-danger">{formErrors.description?.message}</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label class="d-flex justify-content-start">Cuisine:</label>
                                            <select onChange={changeHandler} className="form-select" style = {{marginTop: "5px"}} aria-label="Default select example" name="theme">
                                                <option selected>Choose cuisine type</option>
                                                {
                                                    allCuisines.map((cuisine, i)=>{
                                                        return (<option key = {i} value={cuisine}>{cuisine}</option>)
                                                    })
                                                }
                                                <option value="Other">Other</option>
                                            </select>
                                            {/* <p className="text-danger">{formErrors.password?.message}</p> */}
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between form-group">
                                            <label class="d-flex justify-content-start">Paid Event? </label>
                                            {/* ternary operator to prevent bug that uncheckes the checkbox after clicking the "back" button */}
                                            {formInfo.isPaid?<input onChange={changeHandler} type="checkbox" name="isPaid" className="form-checkbox" value={formInfo.isPaid} checked/>:<input onChange={changeHandler} type="checkbox" name="isPaid" className="form-checkbox" value={formInfo.isPaid}/>}
                                        </div>
                                        {formInfo.isPaid?
                                        <div className="form-group">
                                            <label class="mt-3 d-flex justify-content-start">Price:</label>
                                            <input onChange={changeHandler} type="number" name="price" className="form-control" value={formInfo.price} min="0" max="1000"/>
                                        </div>:""}
                                        <div className="mt-3 d-flex justify-content-between">
                                            <button onClick={movenext} className="btn btn-danger mt-3">Back</button>
                                            <input type="submit" value="Create Event" className="btn btn-danger mt-3" />
                                        </div>
                                    </div>
                            }
                        </form>
                    </div>
                    {/* ======================EVENT PREVIEW DIV========================== */}
                    <div className="col-8">
                        <div className = {styles.eventPreview}>
                            <h5>Event Preview</h5>
                            <div>
                                <div className={styles.display}>
                                    <div className={styles.red}></div>
                                    <div className={styles.white}>
                                        <h4 className={styles.hFour}>{formInfo.startDate==""?<h4 style={{color: 'lightgrey', marginTop:"10px"}}>DD</h4>:moment(formInfo.startDate).format('DD')}</h4>
                                    </div>
                                    <div className="d-flex">
                                        {formInfo.startDate==""?<h6 style={{color: 'lightgrey', marginTop:"10px"}}>EVENT DATE</h6>:<h6 className={styles.date}>{moment(formInfo.startDate).format('MMMM Do, YYYY').toUpperCase() + " "}</h6>}
                                        {formInfo.startDate==""?"":formInfo.startTime==""?"":<h6 className={styles.date}>&nbsp;{formInfo.startTime}</h6>}
                                        {/* end time & date conditionals */}
                                        {formInfo.startDate==formInfo.endDate?"":formInfo.endTime==""?"":<h6 className={styles.date}>&nbsp;- {formInfo.endTime}</h6>}
                                    </div>
                                        {formInfo.startDate!=formInfo.endDate?"":formInfo.endTime==""?"":<h6 className={styles.date}>&nbsp;- {formInfo.endDate} {formInfo.endTime}</h6>}
                                    <h4 className={styles.title}>{formInfo.title==""?<h4 style={{color: 'grey', fontWeight: 'bold'}}>Event Title</h4>:formInfo.title}</h4>
                                    {loggedinuser?<p class="text-start fw-light">Hosted by <span class="fw-bolder">{loggedinuser.username}</span></p>:<p class="text-start fw-light">Hosted by</p>}
                                    <hr />
                                    <div>
                                        <p className={styles.details}>
                                        {formInfo.description}
                                        </p>
                                    </div>
                                    
                                    {oneNeighborhoodId?<img src={oneNeighborhood.url} alt="neighborhood" height="150px"/>:""}
                                    {oneNeighborhoodId?<p>{oneNeighborhood.neighName}</p>:""}
                                    {formInfo.isPaid?<button className="btn btn-danger d-flex justify-content-center">Buy Ticket</button>:<button className="btn btn-danger d-flex justify-content-center">Join</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CreateEvent;