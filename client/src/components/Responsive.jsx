import React, { Component } from "react";
import Slider from "react-slick";
import Card from 'react-bootstrap/Card';
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import styles from './Responsive.module.css';


export default class Responsive extends Component {
    render() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 5,
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
                style={{ ...style, display: "block", background: "red" }}
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

    
    return (
            <Slider {...settings} >
            {this.props.allNeighborhoods.map((n,i)=>{
                return (
                    <a className={styles.sliderCardTitle} href={`/events/neighborhood/${n._id}`}>
                        <div style={{margin:"10px", width:"230px", textDecoration:"none"}}>
                            <Card style={{borderRadius:"15px", textDecoration:"none"}}>
                                <Card.Img variant="top" src={n.url} style={{borderRadius:"15px 15px 0 0", height:"220px", objectFit: "cover"}}/>
                                <Card.Body>
                                    <Card.Title>{n.neighName}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </a>
            )})
            }
            </Slider>
    );
    }
}
