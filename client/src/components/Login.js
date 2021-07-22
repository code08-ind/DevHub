import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import login from '../images/login.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';

toast.configure();

const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        if (res.status === 200 && data) {
            dispatch({ type: "USER", payload: true });
            toast.success('User Login Successfull!');
            setTimeout(() => {
                history.push("/");
            }, 4000);
        }
        else if (res.status === 400 || !data) {
            toast.warn('Invalid Login User Credentials');
        }
    }

    return (
        <>
            <section className="sign-in main">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={login} alt="Sign In Pic" />
                            </figure>
                            <NavLink to="/signup" className="signup-image-link">
                                I Haven't Signed Up
                            </NavLink>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title new">Sign In To DevHub</h2>
                            <form method="POST" className="register-form new" id="register-form" autoComplete="new-password"  >
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Sign In" onClick={loginUser} />
                                </div>
                            </form>
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

export default Login;;
