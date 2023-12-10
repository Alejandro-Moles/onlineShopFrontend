import React, { useState, useRef } from "react";
import "./css/LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import CustomAlert from '../AlertsMessage/CustomAlert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (
      !emailValue ||
      !passwordValue
    ) {
      showAlert('Please fill in all fields', 'info');
      return;
    }

    AuthService.loginUser({
        mail: emailValue,
        password: passwordValue,
    }).then((response) => {
        showAlert('Successful user login', 'success');
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        window.location.href = '/';
    }).catch((error) => {
      console.log(error.response.data)
      if(error.response.data.error){
        if(error.response.data.error = "Unauthorized"){
          showAlert('The password is not correct','error');
        }
      }else{
        showAlert(error.response.data, 'error');
      }
    });

  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  return (
    <div className="login">
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={2000}
      />
      <div className="form_container">
        <form onSubmit={handleSubmit}>
            <h3 className="text-center">Sign In</h3>

            <div className="my-input">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                ref={emailRef}
                ></input>
            </div>

            <div className="my-input password-input-container">
                <label htmlFor="password">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="form-control password-input"
                    ref={passwordRef}
                ></input>
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
            </div>

            <div className="d-grid mt-2">
                <button className="btn btn-primary" type="submit">
                  Login 
                </button>
            </div>

            <p className="text-end mt-2">
                <Link to="/signup" className="ms-2">
                Sign up
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
