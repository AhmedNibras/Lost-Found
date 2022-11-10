import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";

import {useSelector, useDispatch} from "react-redux"
import { setLogout } from "../redux/features/authslice";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const token = user?.token;

  if(token) {
    const decodedToken = decode(token);
    if(decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
  const handleLogout = () => {
    dispatch(setLogout())
  }
  return (
    <div>
      <MDBNavbar fixed="top" expand="lg" className=" bg-blue-800">
        <MDBContainer>
          <MDBNavbarBrand 
          href="/" 
          className="text-xl text-white font-semibold"
          >
            Lost&Found 
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
            className="text-white"
            >
            <MDBIcon icon="bars" fas></MDBIcon>
          </MDBNavbarToggler>
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
                <h5 className="mr-8 mt-3 text-white">
                    User : {user?.result?.name}
                </h5>
            )}
            {/* Home */}
                <MDBNavbarItem>
                    <MDBNavbarLink href="/">
                        <p className="font-medium mt-1.5 text-lg color text-white hover:text-xl">Home</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                {/* If user is login */}
            {user?.result?._id && (
                <>
                {/* Add Item */}
                <MDBNavbarItem>
                    <MDBNavbarLink href="/addItem">
                        <p className="font-medium mt-1.5 text-lg color text-white hover:text-xl">Add Item</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
            {/* Dashboard */}
                <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard">
                        <p className="font-medium mt-1.5 text-lg color text-white hover:text-xl">Dashboard</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>

                </>
            )}
            
            
            {user?.result?._id ? (
                <>
                 {/* Logout */}
                 <MDBNavbarItem>
                    <MDBNavbarLink href="/login">
                        <p className="font-medium mt-1.5 text-lg color text-white hover:text-xl" onClick={handleLogout}>Logout</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                </>
            ) : (
                <>
                {/* Login */}
                <MDBNavbarItem>
                    <MDBNavbarLink href="/login">
                        <p className="font-medium mt-1.5 text-lg color text-white hover:text-xl">Login</p>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                </>
            )}
           
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Header;
