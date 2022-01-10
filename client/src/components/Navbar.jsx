import React from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios'

const Navbar = () => {

    const history = useHistory()

    const logout = (e)=>{
        e.preventDefault()
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                history.push("/")
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Cuisago</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/events/all">Events</a>
                                </li> */}
                                <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/create/event">Create an Event</a>
                                </li>
                                {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/profile/edit">Edit Profile</a>
                                </li> */}
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-danger" type="submit">Search</button>
                                <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={logout}>Logout</button>
                            </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};


export default Navbar;