import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import Navbar from './Navbar';
import Card from 'react-bootstrap/Card';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Responsive from './Responsive';

const Dashboard = () => {
    const history = useHistory()
    const [loggedinuser, setloggedinuser] = useState(null)
    const [allNeighborhoods, setAllNeighborhoods] = useState([])

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


    return (
        <div>
            <Navbar/>
            {loggedinuser? <h2>Welcome {loggedinuser.username}</h2>:<h2>Please log in</h2>}
                <Responsive allNeighborhoods = {allNeighborhoods}/>
        </div>
    );
};


export default Dashboard;