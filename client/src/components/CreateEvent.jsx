import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import styles from './CreateEvent.module.css';
import Navbar from './Navbar';
import moment from 'moment'

const CreateEvent = () => {
    const history = useHistory();
    const [loggedin, setloggedin] = useState({});
    const [loggedinId, setLoggedinId] = useState("");
    const allNeighborhoods = ["River North", "Lincoln Park", "Chinatown", "Hyde Park", "Little Village", "Garfield Park", "Lake View", "West Loop", "Logan Square", "Austin", "Englewood", "South Chicago", "Little Italy", "Wicker Park", "South Loop", "Albany Park", "Humboldt Park", "Old Town", "Fulton Market", "Wrigleyville", "Back of the Yards", "Bronzeville", "Roscoe Village", "Ukrainian Village", "Bucktown", "Printer's Row"].sort()

    const [formInfo,setFormInfo] = useState({
        title: "",
        date: "",
        neighborhood: "",
        theme: "",
        description: "",
        hostId: ""
    })

    const [formErrors, setFormErrors] = useState({
        title: "",
        date: "",
        neighborhood: "",
        theme: "",
    })
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/loggedin", {withCredentials:true})
        .then(res=>{
            console.log("logged in user data",res)
            setloggedin(res.data.user)
            setLoggedinId(res.data.user._id)
            setFormInfo({
                ...formInfo,
                hostId: loggedinId
        })
    })
        .catch(err=>{
            console.log(err)
        })
    }, [loggedinId])
    
    
    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const createEvent = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/events", formInfo)
            .then(response=>{
                console.log("response when creating an event", response)

                if(response.data.err){ //if the form is not filled out properly
                    console.log("create event error", response.data.err.errors)
                    setFormErrors(response.data.err.errors)
                }else{
                    console.log("success")
                    setFormInfo({
                        title: "",
                        date: "",
                        neighborhood: "",
                        theme: ""
                    })
                    //if there's any existing previouse error messages, clear them out upon submittal
                    setFormErrors({
                        title: "",
                        date: "",
                        neighborhood: "",
                        theme: ""
                    })
                    history.push("/dashboard")
                }
            })
            .catch(err=>console.log({err}))
    }

    return (
        <div className={ styles.backgroundColor }>
            <div className={ styles.background }>
                <Navbar/>
                <div className="container" style = {{marginTop:"20px"}}>
                    <div className="row">
                        <form onSubmit={createEvent} className="container" className={styles.formBox}>
                            <div className="form-group">
                                <label>Title*:</label>
                                <input onChange={changeHandler} type="text" name="title" className="form-control" style = {{marginTop: "5px"}} value={formInfo.title} placeholder="Event name" />
                                <p className="text-danger">{formErrors.title?.message}</p>
                            </div>
                            <label>Start Date and Time*:</label>
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-group">
                                        <input onChange={changeHandler} type="date" name="date" className="form-control" style = {{marginTop: "5px"}} value={formInfo.date} placeholder="Start Date"/>
                                        <p className="text-danger">{formErrors.date?.message}</p>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="form-group">
                                        <input onChange={changeHandler} type="time" name="time" className="form-control" style = {{marginTop: "5px"}} value={formInfo.time} />
                                        <p className="text-danger">{formErrors.time?.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Neighborhood:</label>
                                <select onChange={changeHandler} className="form-select" style = {{marginTop: "5px"}} aria-label="Default select example" name="neighborhood">
                                    <option value="">Choose your neighborhood</option>
                                    {
                                        allNeighborhoods.map((neigh, i)=>{
                                            return (
                                                <option key = {i} value={neigh}>{neigh}</option>
                                            )
                                        })
                                    }
                                </select>
                                {/* <p className="text-danger">{formErrors.password?.message}</p> */}
                            </div>
                            <div className="form-group">
                                <label>Theme*:</label>
                                <input onChange={changeHandler} type="text" name="theme" className="form-control" style = {{marginTop: "5px"}} value={formInfo.theme} />
                                {/* <p className="text-danger">{formErrors.theme?.message}</p> */}
                            </div>
                            <div className="form-group">
                                <label>Description*:</label>
                                <textarea onChange={changeHandler} name="description" class="form-control" style = {{marginTop: "5px"}} rows="5">{formInfo.description}</textarea>
                                <p className="text-danger">{formErrors.description?.message}</p>
                            </div>
                            <input type="submit" value="Create Event" className="btn btn-danger mt-3" />
                        </form>
                        {/* ======================EVENT PREVIEW DIV========================== */}
                        <div className = {styles.eventPreview}>
                            <h5>Event Preview</h5>
                            <div>
                                <div className={styles.display}>
                                    <div className={styles.red}></div>
                                    <div className={styles.white}>
                                        <h4 className={styles.hFour}>{formInfo.date==""?<h4 style={{color: 'lightgrey', marginTop:"10px"}}>DD</h4>:moment(formInfo.date).format('DD')}</h4>
                                    </div>
                                    <h6 className={styles.date}>{formInfo.date==""?<h6 style={{color: 'lightgrey', marginTop:"10px"}}>EVENT DATE</h6>:moment(formInfo.date).format('MMMM Do, YYYY').toUpperCase()}</h6>
                                    <h4 className={styles.title}>{formInfo.title==""?<h4 style={{color: 'grey', fontWeight: 'bold'}}>Event Title</h4>:formInfo.title}</h4>
                                    <div>
                                        <p className={styles.details}>
                                        {formInfo.description}
                                        </p>
                                    </div>
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