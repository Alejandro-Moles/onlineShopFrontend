import React from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css";

function Login(){
    return (
        <div className="login">
            <div className="form_container">
                <form>
                    <h3 className="text-center">Sign In</h3>
                    <div className="my-input">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"></input>
                    </div>
                    <div className="my-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" className="form-control"></input>
                    </div>
                    <div className="my-input">
                        <input type="checkbox" className="custom-control custom-checkbox" id="check"/>
                        <label htmlFor="check" className="custom-input-label ms-2">
                            Remember me
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary">Sign in</button>
                    </div>
                    <p className="text-end mt-2">
                        Forgot <Link to="#" className="ms-2">Password</Link><Link to="/signup" className="ms-2">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login;