import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const Developer = ({ user }) => {
    return (
        <>
            <Grid item xs={12} sm={6} lg={3} style={{ display: 'flex' }}>
                <div className="card" style={{ width: "23rem" }}>
                    <img className="card-img-top" src={user.image} alt={user.name} style={{ height: "350px" }} />
                    <div className="card-body d-flex flex-column">
                        <h3 className="card-title text-center">{user.name}</h3>
                        <p className="card-text text-capitalize text-center">{user.work}</p>
                        <NavLink to={`/developer/${user._id}`} className="btn btn-primary text-center mx-auto">Go To Profile</NavLink>
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Developer;
