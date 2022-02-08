import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import Login from './Login';

const Comment = () => {
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
            <h2>Register Below</h2>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label>Username*:</label>
                            <input type="text" name="username" className="form-control" value={formInfo.username} />
                            <p className="text-danger">{formErrors.username?.message}</p>
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


export default Comment;