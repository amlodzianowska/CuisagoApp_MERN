import React, { Component } from "react";
import Slider from "react-slick";
import Card from 'react-bootstrap/Card';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";


export default class Responsive extends Component {
    render() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            },
        },
        ],
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red"}}
                onClick={onClick}
            />
            );
        }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }
    const buttonClick = () => {
        console.log(this.props.eventsInMyNeigh)
    }
    
    return (
        <>
            <Slider {...settings} style={{width:"90%", marginLeft:"90px"}}>
            {this.props.eventsInMyNeigh.map((e,i)=>{
                return (
                    <Link key={i} to = {`/events/neighborhood/${e._id}`}>
                        <div style={{margin:"10px", width:"230px", textDecoration:"none"}}>
                            <Card style={{borderRadius:"15px", textDecoration:"none", boxShadow:"5px 5px 13px 5px lightgrey"}}>
                                <Card.Img variant="top" src="https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1-500x500.jpg" style={{borderRadius:"15px 15px 0 0", height:"220px", objectFit: "cover"}}/>
                                <Card.Body style={{ color:"black", textDecoration:"none"}}>
                                    <Card.Title style={{ color:"black", textDecoration:"none"}}>{e.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </Link>
            )})
            }
            </Slider>
        </>
    );
    }
}
