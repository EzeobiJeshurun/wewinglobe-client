import React from 'react';
import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Posts from '../components/Posts';
import Profile   from '../components/Profile';



function Home() {
   
    const [weshout, setWeshout] = useState(false);
    useEffect(()=>{
        axios.get('/weshout')
        .then(res =>{
            //console.log(res.data);
            setWeshout(res.data);
        }).catch((error)=>{
            console.log(error);
        });

    },[]);

let recentScreamsMarkup = weshout? (weshout.map(onepost=> <Posts key={onepost.weshoutId} onepost={onepost} />)):(<p>loading...</p>)
    return (
        <Grid container spacing={4}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
        </Grid>
        </Grid>
    )
}

export default Home
