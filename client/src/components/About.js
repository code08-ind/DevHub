import React, { useState, useEffect } from 'react';
import profilepic from '../images/profilepic.jpg'
import { useHistory } from 'react-router-dom';

const About = () => {
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
        callAboutPage();
    }, []);
    return (
        <>
            <div className="container emp-profile" style={{ marginTop: "110px" }}>
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={user === '' ? profilepic : user.image} alt={user.name} style={{
                                    width: "95%",
                                    borderRadius: "20px",
                                    height: "350px",
                                    boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                                    webkitBoxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                                    mozBoxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)"
                                }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{user === '' ? 'Christiana Wyatt' : user.name}</h5>
                                <h6>{user === '' ? 'Web Developer' : user.work}</h6>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                </ul>
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Developer Id</label>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <p>{user === '' ? '12345fjhfdkjawjoolzs' : user._id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone Number</label>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <p>{user === '' ? '+XY XXXXXXXXXX' : user.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <p>{user === '' ? 'xyz12@gmail.com' : user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Portfolio Website Link</label>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <p>{user === '' ? 'www.zxy.com' : user.portfolio}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Resume Link</label>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <p>{user === '' ? 'www.zxy.com' : user.resume}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <a href={user === '' ? 'www.zxy.com' : user.github}><button className="btn btn-primary">GitHub</button></a>
                            <a href={user === '' ? 'www.zxy.com' : user.linkedin}><button className="btn btn-success my-3">LinkedIn</button></a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default About;
