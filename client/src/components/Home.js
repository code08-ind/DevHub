import React, { useState, useEffect } from 'react';
import home from '../images/home.svg';
import Login from '../images/Login.PNG';
import Developers from '../images/Developers.PNG';
import Developer from '../images/Developer.PNG';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { AiFillLinkedin, AiFillFacebook, AiFillInstagram, AiFillGithub } from "react-icons/ai";
import '../index.css';

const Home = () => {
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
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);
    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    {!user ? <h1>Welcome To Dev<span style={{ color: "#0066ff" }}>Hub</span></h1> : <h1>Welcome <span style={{ color: "#0066ff" }}>{user.name}</span> To Dev<span style={{ color: "#0066ff" }}>Hub</span></h1>}
                    {!user ? <h3 className="pt-2">Welcome To The DevHub Dashboard Where You Can Find Developers Under One Roof</h3> : <h3 className="pt-2">Happy To See You Back At DevHub.</h3>}
                </div>
            </div>
            <br />
            <section>
                <br />
                <br />
                <div className="first">
                    <div className="row firstRow">
                        <div className="col-md-5">
                            <h1>Welcome To Our Professional Developer Community</h1>
                            <p>Here You Can Find Many Like Minded People At DevHub.</p>
                        </div>
                        <div className="col-md-5">
                            <img src={home} alt="DevHub About" />
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </section>
            <section>
                <br />
                <br />
                <div className="second">
                    <div className="row secondRow">
                        <div className="col-md-5">
                            <h1>Find Developers Under One Roof</h1>
                            <p>Here You Can Find Many Developers Along With Their Details So That Anyone Can Contact And Work And Collaborate With Developers At DevHub.</p>
                        </div>
                        <div className="col-md-5">
                            <img src={Developers} alt="DevHub About" />
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </section>
            <section>
                <br />
                <br />
                <div className="third">
                    <div className="row thirdRow">
                        <div className="col-md-5">
                            <h1>Find A Developer</h1>
                            <p>Here You Can Find Any Developer And Then See His/Her Details And Contact Him/Her Through Various Methods For Future Collboration.</p>
                        </div>
                        <div className="col-md-5">
                            <img src={Developer} alt="DevHub About" />
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </section>
            <section>
                <br />
                <br />
                <div className="fourth">
                    <div className="row fourthRow"> 
                        <div className="col-md-5">
                            <h1>Login And Register Facility</h1>
                            <p>Here You Can Safely And Securely Make An Account And Login Through It. One Can Only View Details Regarding Himself, Contact Us Or View Developers At DevHub After Creating An Account And Successfully Signing In To DevHub.</p>
                        </div>
                        <div className="col-md-5">
                            <img src={Login} alt="DevHub About" />
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </section>
            <footer>
                <div className="logo">
                    <div className="mainLogo">
                        <img src={logo} alt="ImgSplash" width="68" height="68" style={{ marginLeft: "20px", marginBottom: "-10px" }} />
                        <NavLink className="nameLogo" to="/" style={{ marginBottom: "-10px", fontWeight: "bold" }}>&nbsp;Dev<span style={{ color: "#0066ff" }}>Hub</span></NavLink>
                    </div>
                    <div className="moreContent">
                        <NavLink to="/">
                            Home
                        </NavLink>
                        <NavLink to="/register">
                            Register
                        </NavLink>
                        <NavLink to="/signin">
                            Login
                        </NavLink>
                    </div>
                </div>
                <div className="social">
                    <a href="https://www.linkedin.com/in/aryan-garg-661552198/">
                        <AiFillLinkedin style={{ color: "#0077b5" }} />
                    </a>
                    <a href="https://www.instagram.com/aryan_garg_08/?hl=en">
                        <AiFillInstagram style={{ color: "#DD2A7B" }} />
                    </a>
                    <a href="https://www.facebook.com/aryan.garg.9022662/">
                        <AiFillFacebook style={{ color: "#4267B2" }} />
                    </a>
                    <a href="https://github.com/code08-ind">
                        <AiFillGithub style={{ color: "black" }} />
                    </a>
                </div>
                <p>All Rights Reserved &copy; <span>DevHub</span> @2021</p>
            </footer>
        </>
    );
}

export default Home;
