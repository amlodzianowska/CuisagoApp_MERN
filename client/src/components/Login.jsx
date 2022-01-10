import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory()
    const [formInfo,setFormInfo] = useState({
        email: "",
        password: "",
    })

    const [errormsg, setErrormsg] = useState("")

    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", formInfo, {withCredentials:true})
            .then(res=>{
                console.log("res when logging in", res)
                if(res.data.msg === "success"){
                    history.push("/dashboard")
                }else{
                    setErrormsg(res.data.msg)
                }})
            .catch(err=>console.log({err}))
            }

    return (
        <div>
            <h2>Login</h2>
            {errormsg?<p className="text-danger">{errormsg}</p>:""}
            <form onSubmit={login}>
                <div className="form-group">
                    <label>Email:</label>
                    <input onChange={changeHandler} type="text" name="email" className="form-control" value={formInfo.email} />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input onChange={changeHandler} type="password" name="password" className="form-control" value={formInfo.password}/>
                </div>
                <input type="submit" value="Sign In" className="btn btn-success mt-3" />
            </form>
        </div>
    );
};

Login.propTypes = {};

export default Login;