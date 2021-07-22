import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logout from '../images/logout.svg';
import { UserContext } from '../App';

const Logout = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: "USER", payload: false });
            toast.info('User Logout Successfull!');
            setTimeout(() => {
                history.push("/signin", { replace: true });
            }, 4000);
            if (!res.status === 200) {
                toast.warn('User Logout Unsuccessfull!');
                throw new Error(res.error);
            }
        }).catch((err) => {
            console.error(err);
        });
    });

    return (
        <>
            <div className="error">
                <img src={logout} alt="404 Error" />
                <h1>THANKS FOR VISITING AT DEVHUB!</h1>
                <p>You Are Being Logedout!!!</p>
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
        </>
    );
}

export default Logout;
