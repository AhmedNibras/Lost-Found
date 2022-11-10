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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authslice";
// import { GoogleLogin } from "react-google-login";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  // Input Change
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

    // const googleSucess = ( resp ) => {
    //   console.log(resp);
    // };
    // const googleFailure = (error) => {
    //   toast.error(error)
    // };

  return (
    <div className="my-32 mx-auto p-25 max-w-md">
      <MDBCard className="square border border-3 items-center rounded-5">
        {/* Icon and Sign in */}
        <MDBIcon
          fas
          icon="user-circle"
          className="text-blue-800 mt-4 h-16 fa-3x"
        />
        <h5>Sign In</h5>

        {/* Card Validation */}
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            {/* Input  */}
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
            {/* Password */}
            <MDBValidationItem feedback='Please provide password' invalid>

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
            {/* Button */}
            <div className="col-12">
              <MDBBtn type="submit" className="w-full mt-3" color="primary">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
              {/* <MDBBtn type='reset' className="w-full mt-3" color="primary">Reset form</MDBBtn> */}
            </div>
          </MDBValidation>

          <br />
          
          {/* Google Login   */}
          {/* <GoogleLogin
            clientId="973177648395-vqto5o014fqmrld9vqjl326h39flikfc.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                // type="submit"
                className="w-full mt-3"
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" />
                Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
        </MDBCardBody>

        {/* Footer of Email */}
        <MDBCardFooter>
          {/* Link to Register Page */}
          <Link to="/register">
            <p>Don't have an account? Sign Up</p>
          </Link>

          {/* Forgot Password Button */}
          <MDBBtn color="primary" size="md" className="mb-3">
            Forgot Password?
          </MDBBtn>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
