import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import Navbar from './Navbar';

const Dashboard = () => {
    const history = useHistory()
    const [loggedinuser, setloggedinuser] = useState(null)

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

    return (
        <div>
            <Navbar/>
            {loggedinuser? <h2>Welcome {loggedinuser.username}</h2>:<h2>Please log in</h2>}
        </div>
    );
};


export default Dashboard;