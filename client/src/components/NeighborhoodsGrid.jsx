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
                                image={e.picUrl}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography>{e.title}</Typography>
                            </CardContent>
                            <CardActions>
                            <Button href={`/event/${e._id}`} variant="secondary">SEE DETAILS</Button>
                            </CardActions>
                        </Card>
                    </Grid>

            )})
            }
            </Grid>
        </>
    );
};


export default NeighborhoodsGrid;