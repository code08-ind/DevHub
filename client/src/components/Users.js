import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useStyles from '../styles.js';
import { Grow, Grid } from '@material-ui/core';
import Developer from './Developer.js';
import { useHistory } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState('');
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUser(data);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error);
            history.push('/signin');
        }
    }
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://localhost:6450/api/usersprofiles');
            setUsers(res.data);
        }
        getData();
        callAboutPage();
    }, []);
    return (
        <>
            <h1 style={{ fontWeight: "bold" }} className="text-center my-5">Developers At Dev<span style={{ color: "#0066FF", fontWeight: "bold" }}>Hub</span></h1>
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={4}>
                    {users.map((user) => (
                        <Developer user={user} key={user._id} />
                    ))}
                </Grid>
            </Grow>
        </>
    );
}

export default Users;
