import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import Login from './Login';

const Registration = () => {
    const history = useHistory()
    const [allNeighborhoods, setAllNeighborhoods] = useState([])

    const [formInfo,setFormInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        neighborhood_id: ""
    })

    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/api/neighborhoods")
            .then(response=>{
                console.log("response when getting all neighborhoods: ", response)
                setAllNeighborhoods(response.data.results)
            })
            .catch(err=>console.log("error: ", err))
    },[])

    const register = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/register", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("res when registering a new user", res)

                if(res.data.errors){ //if the form is not filled out properly
                    setFormErrors(res.data.errors)
                }else{
                    history.push("/dashboard")
                    
                    setFormInfo({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        neighborhood_id: "",
                    })

                    //if there's any existing previouse error messages, clear them out upon submittal
                    setFormErrors({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    })
                }
            })
            .catch(err=>console.log({err}))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>Register Below</h2>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label>Username*:</label>
                            <input onChange={changeHandler} type="text" name="username" className="form-control" value={formInfo.username} />
                            <p className="text-danger">{formErrors.username?.message}</p>
                        </div>

                        <div className="form-group">
                            <label>Email*:</label>
                            <input onChange={changeHandler} type="text" name="email" className="form-control" value={formInfo.email} />
                            <p className="text-danger">{formErrors.email?.message}</p>
                        </div>

                        <div className="form-group">
                            <label>Profile Pic URL:</label>
                            <input onChange={changeHandler} type="text" name="profilePicUrl" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Password*:</label>
                            <input onChange={changeHandler} type="password" name="password" className="form-control" value={formInfo.password}/>
                            <p className="text-danger">{formErrors.password?.message}</p>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password*:</label>
                            <input onChange={changeHandler} type="password" name="confirmPassword" className="form-control" value={formInfo.confirmPassword}/>
                            <p className="text-danger">{formErrors.confirmPassword?.message}</p>
                        </div>

                        <div className="form-group">
                            <label>Neighborhood:</label>
                            <select onChange={changeHandler} className="form-select" style = {{marginTop: "5px"}} aria-label="Default select example" name="neighborhood_id">
                                <option value="">Choose your neighborhood</option>
                                {
                                    allNeighborhoods.map((neigh, i)=>{
                                        return (
                                            <option key = {i} value={neigh._id}>{neigh.neighName}</option>
                                        )
                                    })
                                }
                            </select>
                            <p className="text-danger">{formErrors.neighborhood_id?.message}</p>
                        </div>

                        

                        <input type="submit" value="Sign Up" className="btn btn-success mt-3" />
                    </form>
                </div>
                <div className="col-6">
                    <Login/>
                </div>
            </div>
        </div>
    );
};


export default Registration;