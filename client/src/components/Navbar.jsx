import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from 'react-bootstrap';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Avatar from '@material-ui/core/Avatar';

const Navbar = () => {
    const [loggedinuser, setloggedinuser] = useState(null)
    const history = useHistory()

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <div>
            <AppBar variant="secondary" color="white" style={{boxShadow: "none", height: "100px"}}>
                <Container>
                <Toolbar>
                <img src="/images/logo.png" alt="logo" height="40px" />
                <Button className="" href="/create/event">
                    Create Event
                </Button>
                <Button href="/dashboard" variant="h6">
                    Home
                </Button>
                <Button onClick={logout}>Logout</Button>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                {loggedinuser?<Button color="secondary"><Avatar alt={loggedinuser.username} src={loggedinuser.profilePicUrl}/>{loggedinuser.username}</Button>:"" }
                
                </Toolbar>
                </Container>
            </AppBar>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/events/all">Events</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/create/event">Host an Event</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/profile/edit">Edit Profile</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-danger" type="submit">Search</button>
                            <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={logout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav> */}
        </div>
    );
};


export default Navbar;