import React from "react";
import "./LoginSignup.css";
import { Link } from "react-router-dom";

function Signup(){
    return(
            <div className="login">
                <div className="form_container">
                    <form>
                        <h3 className="text-center">Sign Up</h3>
                        <div className="my-input">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" placeholder="Enter First Name" className="form-control"></input>
                        </div>
                        <div className="my-input">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" placeholder="Enter Last Name" className="form-control"></input>
                        </div>
                        <div className="my-input">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control"></input>
                        </div>
                        <div className="my-input">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter password" className="form-control"></input>
                        </div>
                        <div className="d-grid mt-2">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <p className="text-end mt-2">
                            Alredy Registred<Link to="/login" className="ms-2">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
    )
}

export default Signup;