import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const Contact = () => {
    const history = useHistory();
    const [user, setUser] = useState({ name: "", email: "", phone: "", message: "" });
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
            setUser({ ...user, name: data.name, email: data.email, phone: data.phone });
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const callAboutPages = async () => {
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
        callAboutPages();
    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = user;
        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message
            })
        });

        const data = await res.json();
        if (res.status === 201 && data) {
            setUser({ ...user, message: "" })
            toast.success('Message Sent Successfully!');
            setTimeout(() => {
                history.push("/");
            }, 4000);
        }
        else if (res.status === 422 || !data) {
            toast.danger('Message Not Sent!');
        }
        else if (!user) {
            toast.warn('Please Sign In!');
        }
    }

    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/30/000000/iphone.png" alt="Phone" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Phone
                                    </div>
                                    <div className="contact_info_text">
                                        +91 7986957185
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/30/000000/secured-letter.png" alt="Email" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Email
                                    </div>
                                    <div className="contact_info_text">
                                        devhub.info08@gmail.com
                                    </div>
                                </div>
                            </div>
                            <div className="contact_info_item d-flex justify-content-start align-items-center">
                                <img src="https://img.icons8.com/office/30/000000/worldwide-location.png" alt="Address" />
                                <div className="contact_info_content">
                                    <div className="contact_info_title">
                                        Address
                                    </div>
                                    <div className="contact_info_text">
                                        #84, Bachittar Nagar, Patiala, Punjab
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact_form" style={{ marginTop: "-35px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container py-5">
                                <div className="contact_form_title">
                                    Get In Touch With DevHub
                                </div>
                                <form method="POST" id="contact_form">
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" id="contact_form_name" className="contact_form_name input_field" placeholder="Enter Your Name" name="name" title="Your Name" value={!user ? null : user.name} onChange={handleInputs} required />
                                        <input type="email" id="contact_form_email" className="contact_form_email input_field" placeholder="Enter Your Email" name="email" title="Your Email" value={!user ? null : user.email} onChange={handleInputs} required />
                                        <input type="text" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Enter Your Phone Number" name="phone" title="Your Phone" value={!user ? null : user.phone} onChange={handleInputs} required />
                                    </div>
                                    <div className="contact_form_text">
                                        <textarea className="text_field contact_form_message mt-5" placeholder="Enter Your Message" name="message" value={user.message} onChange={handleInputs} cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button" onClick={contactForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
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
            </div>
        </>
    );
}

export default Contact;
