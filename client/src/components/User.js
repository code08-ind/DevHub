import axios from 'axios';
import React, { useState, useEffect } from 'react';

const User = ({ match }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://localhost:6450/api/usersprofiles/${match.params.id}`);
            setUser(res.data);
        }
        getData();
    }, [match]);

    return (
        <>
            <div className="container emp-profile" style={{ marginTop: "110px" }}>
                <form action="">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={user.image} alt={user.name} style={{
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
                                <h5 style={{ textTransform: "capitalize" }}>{user.name}</h5>
                                <h6 style={{ textTransform: "capitalize" }}>{user.work}</h6>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                </ul>
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Developer Id</label>
                                            </div>
                                            <div className="col-md-8 mt-3">
                                                <p>{user._id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Phone Number</label>
                                            </div>
                                            <div className="col-md-8 mt-3">
                                                <p>{user.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-8 mt-2">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Portfolio Website</label>
                                            </div>
                                            <div className="col-md-8 mt-4">
                                                <p className={{ width: "100%" }}>{user.portfolio}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Resume Link</label>
                                            </div>
                                            <div className="col-md-8 mt-4">
                                                <p>{user.resume}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <a href={user.github}><button className="btn btn-primary">GitHub</button></a>
                            <a href={user.linkedin}><button className="btn btn-success my-3">LinkedIn</button></a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default User;
