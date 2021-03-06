import React, {useState,Fragment} from 'react';
import NoImg from '../Images/no-img.jpeg';
//material ui
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    card: {
        display: 'flex',
        [theme.breakpoints.down('770')] :{
            flexDirection: 'column',
        },
        marginBottom:'20',
    },
    cardContent:{
        width: '100%',
        flexDirection: 'column',
        padding: '25px',
    },
    cover:{
        objectFit: 'cover',
        minWidth: 200,
        minHeight: 200,
    },
    handle:{
        width: 60,
        height: 16,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 8,
    },
    date:{
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10,
    },
    fullLine:{
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',

    },
    halfLine: {
        height: 15,
        width: '50%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    bottomSpacer:{
        width: '95%',
        height: '20px',
    }
}));

function WeshoutSkeleton() {
    const classes = useStyles();
    const content = Array.from({length: 5}).map((item,index)=>(
        <Fragment key={index}>
        <Card className={classes.card} >
            <CardMedia className={classes.cover} image={NoImg} alt="dummy"/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}></div>
                <div className={classes.date}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
                
            </CardContent>
        </Card>
        <div className={classes.bottomSpacer}></div>
        </Fragment>
    ));

    return (
        
        <Fragment>
            {content}
        </Fragment>
    )
}

export default WeshoutSkeleton
