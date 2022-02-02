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
    const file = 'csvneighborhoods.csv'
    const [parsedCsvData, setParsedCsvData] = useState([]);

    const allNeighborhoods = [
        {
            "name": "River North",
            "url": "https://fishingbooker.com/blog/media/Chicago-Harbor-System.jpg"
        },
        {
            "name": "Chinatown",
            "url": "https://www.enjoyillinois.com/assets/Tourism-Operators/images/itims/23262_Gate_2836.jpg"
        },
        {
            "name": "Lincoln Park",
            "url": "https://blogmedia.localize.city/blog/wp-content/uploads/2020/08/loncoln-park-zoo-neighborhood.jpg"
        },
        {
            "name": "Hyde Park",
            "url": "https://pme.uchicago.edu/sites/default/files/styles/max_width_full/public/images/2019-09/20170923_drone_0040-f1.jpg?itok=kbl7WcTp"
        },
        {
            "name": "Lake View",
            "url": "https://ppmapartments.com/wp-content/uploads/2019/08/chicago-apartments-belmont-harbor-lakeview-chicago-apartments.jpg"
        },
        {
            "name": "Little Village",
            "url": "https://cdn.choosechicago.com/uploads/2019/05/little-village-e1565982000732-2400x1363.jpg"
        },
        {
            "name": "Garfield Park",
            "url": "http://image.ideabooom.com/wp-content/uploads/2017/11/22014507550.jpg"
        },
        {
            "name": "Logan Square",
            "url": "https://thefoxmagazine.com/wp-content/uploads/2019/05/53641618_2218234858417750_8593823965912837916_n.jpg"
        },
        {
            "name": "Fulton Market",
            "url": "https://www.hotspotrentals.com/wp-content/uploads/2018/12/fulton-market-street.jpg"
        },
        {
            "name": "Gold Coast",
            "url": "https://cdn5.tropicalsky.co.uk/images/800x600/chicago-on-lake-michigan.jpg"
        },
        {
            "name": "Humboldt Park",
            "url": "https://pbs.twimg.com/media/BtaK-oMIIAIL0Mu.jpg"
        },
        {
            "name": "Bronzeville",
            "url": "https://cdn.choosechicago.com/uploads/2019/05/bronzeville-1-e1566186612316.jpg"
        },
        {
            "name": "South Loop",
            "url": "https://www.hotspotrentals.com/wp-content/uploads/2018/09/IMG_2908.jpg"
        },
        {
            "name": "Edgewater",
            "url": "https://media.timeout.com/images/100908005/image.jpg"
        },
        {
            "name": "Uptown",
            "url": "https://s3.amazonaws.com/architecture-org/files/buildings/uptown-theatre-steve-minor-002-2.jpg"
        }
    ]
    

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
            <Responsive/>
            {allNeighborhoods.map((n,i)=>{
                return (
                    <Card style={{ width: '250px' }}>
                        <Card.Img variant="top" src={n.url} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
            )})
            }
        </div>
    );
};


export default Dashboard;