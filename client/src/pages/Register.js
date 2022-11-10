import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem
} from "mdb-react-ui-kit";

import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import { register } from "../redux/features/authslice";



const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth}));
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Password does not match")
    }else{              
    if(email && password && firstName && lastName && confirmPassword){
      dispatch(register({ formValue, navigate, toast }))
    }
  };
  };
  // Input Change
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  
  return (
    <div className="my-20 mx-auto p-22 max-w-md">
    
    
      <MDBCard className="square border border-3 items-center rounded-5">
        {/* Icon and Sign in */}
        <MDBIcon
          fas
          icon="user-circle"
          className="text-blue-800 mt-4 h-16 fa-3x"
        />
        <h5>Sign Up</h5>

        {/* Card Validation */}
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3 flex">
          {/* Input  */}

          <MDBValidationItem feedback='Please provide first name' invalid>
          <div className="row-md-6">
              <MDBInput
                type="text"
                label="First Name"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
              />
            </div>
    </MDBValidationItem>
          
          <MDBValidationItem feedback='Please provide last name' invalid>
            <div className="row-md-6">
              <MDBInput
                type="text"
                label="Last Name"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                
              />
            </div>
          </MDBValidationItem>


            <MDBValidationItem feedback='Please provide your email' invalid>

            <div className="col-md-12">
              <MDBInput
                type="email"
                label="Email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
          
              />
            </div>
            </MDBValidationItem>

            <MDBValidationItem feedback='Please provide your password' invalid>

            {/* Password */}
            <div className="col-md-12">
              <MDBInput
                type="password"
                label="Password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </div>
            </MDBValidationItem>

            <MDBValidationItem feedback='Please provide your confirm password' invalid>

            <div className="col-md-12">
              <MDBInput
                type="password"
                label="Password Confirm"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
              />
            </div>
            </MDBValidationItem>

            {/* Button */}
            <div className="col-12">
              <MDBBtn type='submit' className="w-full mt-3" color="primary">
              {loading && (
                <MDBSpinner 
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
              )}
                Register
              </MDBBtn>
            </div>

          </MDBValidation>
        </MDBCardBody>

        {/* Footer of Email */}
        <MDBCardFooter>
          {/* Link to Register Page */}
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
