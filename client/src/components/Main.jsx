import React from 'react';
import {Link} from "react-router-dom";


const Main = () => {
    return (
        <div>
            <h1>Main Page</h1>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>
    );
};



export default Main;