import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signup from '../images/signup.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const SignUp = () => {

    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        image: "",
        linkedin: "",
        github: "",
        portfolio: "",
        resume: "",
        password: "",
        cpassword: "",
    });

    let name, value;
    const handleInputs = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, image, linkedin, github, portfolio, resume, password, cpassword } = user;
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                work,
                image,
                linkedin,
                github,
                portfolio,
                resume,
                password,
                cpassword
            })
        });

        const data = await res.json();
        if (res.status === 201 && data) {
            toast.success('Registration Successfull!');
            setTimeout(() => {
                history.push("/signin");
            }, 4000);
        }
        else if (res.status === 422 || !data) {
            toast.warn('Invalid Registration!');
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up To DevHub</h2>
                            <form method="POST" className="register-form" autoComplete="new-password" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="Enter Your Name" required value={user.name} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" placeholder="Enter Your Email" autoComplete="off" value={user.email} onChange={handleInputs} required="true" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                    </label>
                                    <input type="text" name="phone" id="phone" placeholder="Phone+CountryCode(EG:+91XXXXXXXXXX)" autoComplete="off" value={user.phone} onChange={handleInputs} title="Phone No. + CountryCode (Eg:+91XXXXXXXXXX)" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="work">
                                        <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                    </label>
                                    <input type="text" name="work" id="work" placeholder="Enter Your Profession" autoComplete="off" value={user.work} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">
                                        <i className="zmdi zmdi-collection-image"></i>
                                    </label>
                                    <input type="text" name="image" id="image" placeholder="Enter Your Profile Image Link" autoComplete="off" value={user.image} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="linkedin">
                                        <i className="zmdi zmdi-linkedin"></i>
                                    </label>
                                    <input type="text" name="linkedin" id="linkedin" placeholder="Enter Your LinkedIn Profile Link" autoComplete="off" value={user.linkedin} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="github">
                                        <i className="zmdi zmdi-github-alt"></i>
                                    </label>
                                    <input type="text" name="github" id="github" placeholder="Enter Your GitHub Profile Link" autoComplete="off" value={user.github} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="portfolio">
                                        <i className="zmdi zmdi-globe"></i>
                                    </label>
                                    <input type="text" name="portfolio" id="portfolio" placeholder="Enter Your Portfolio Website Link" autoComplete="off" value={user.portfolio} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="resume">
                                        <i className="zmdi zmdi-account-box-mail"></i>
                                    </label>
                                    <input type="text" name="resume" id="resume" placeholder="Enter Your Resume Link" autoComplete="off" value={user.resume} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" placeholder="Enter Your Password" autoComplete="off" value={user.password} onChange={handleInputs} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock-outline material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Your Password" autoComplete="off" value={user.cpassword} onChange={handleInputs} />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Sign Up" onClick={postData} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src={signup} alt="Sign Up Pic" />
                            </figure>
                            <NavLink to="/signin" className="signup-image-link">
                                I Have Already Signed Up
                            </NavLink>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>
        </>
    );
}

export default SignUp;
