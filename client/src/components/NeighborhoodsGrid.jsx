import React from 'react';
import {useHistory} from "react-router-dom";
import {BrowserRouter,Switch,Route,Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NeighborhoodsGrid = (props) => {



    
    return (
        <>
            <Grid container spacing={2} justifyContent="center">
            {props.eventsInMyNeigh.map((e,i)=>{
                return (
                    <Grid item xs={2} sm={6}>
                        <Card sx={{ maxWidth: 200}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={e.url}
                                alt="green iguana"
                            />
                            {/* <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                        </Card>
                    </Grid>
                        
            )})
            }
            </Grid>
        </>
    );
};


export default NeighborhoodsGrid;