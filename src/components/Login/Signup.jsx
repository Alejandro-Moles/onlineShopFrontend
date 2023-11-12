import React, { useState, useRef } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import CustomAlert from '../AlertsMessage/CustomAlert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [showPassword, setShowPassword] = useState(false);


  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const birthDateRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstNameValue = firstNameRef.current.value;
    const lastNameValue = lastNameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const birthDateValue = birthDateRef.current.value;

    if (
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue ||
      !birthDateValue
    ) {
      showAlert('Please fill in all fields', 'info');
      return;
    }

    const dateParts = birthDateValue.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  
    try {
      const response = await AuthService.registerUser({
        name: firstNameValue,
        surname: lastNameValue,
        mail: emailValue,
        password: passwordValue,
        birth: formattedDate
      });
      showAlert('Correct', 'success');
      window.location.href = '/login';
    } catch (error) {
      console.log(error);
      showAlert('There was an error registering the user ' + error, 'error');
    }
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
            <h3 className="text-center">Sign Up</h3>

            <div className="my-input">
                <label htmlFor="fname">First Name</label>
                <input
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                ref={firstNameRef}
                ></input>
            </div>

            <div className="my-input">
                <label htmlFor="lname">Last Name</label>
                <input
                type="text"
                placeholder="Enter Last Name"
                className="form-control"
                ref={lastNameRef}
                ></input>
            </div>

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

            <div className="my-input">
                <label htmlFor="birthdate">Date of Birth</label>
                <input
                type="date"
                className="form-control"
                ref={birthDateRef}
                ></input>
            </div>

            <div className="d-grid mt-2">
                <button className="btn btn-primary" type="submit">
                Sign Up
                </button>
            </div>

            <p className="text-end mt-2">
                Already Registered<Link to="/login" className="ms-2">
                Sign in
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
