import React, { useContext } from 'react';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/about">About Me</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/developers">Developers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/contact">Contact Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
            );
        }
        else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/about">About Me</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/developers">Developers</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/contact">Contact Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/signin">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/signup">Register</NavLink>
                    </li>
                </>
            );
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "white" }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand logo" to="/"><img src={logo} alt="DevHub" style={{ backgroundColor: "white", boxShadow: "none" }} />Dev<span>Hub</span></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <RenderMenu />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
