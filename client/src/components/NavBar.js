import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userAction'

import axios from 'axios'

function NavBar() {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState
    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const username = userData.name






    return (

        <div className="navbarStyle">


            <Navbar bg="dark" variant="dark" expand="lg">
                {/* <Container> */}
                <Navbar.Brand href="#home" className="fw-bold storeLogo">
                    CV<span className="text-danger">Builder</span>
                </Navbar.Brand>
                <Nav className="me-auto navLinks">

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav.Link href="/home" className="navLink">
                            Home
                        </Nav.Link>
                     
                     

                       
                        
                        <li className="nav-item dropdown ">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="text-white">{currentUser ? currentUser.fname : ""}</span>

                                {/* <AccountBoxIcon /> */}
                            <FontAwesomeIcon  icon={faUserCircle} size="lg" />

                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {currentUser  ?
                                    <>
                                        <li>
                                         
                                                <a to="/"><button className="btn btn-outline-info m-2" onClick={() => { dispatch(logoutUser()) }}>Logout</button></a>


                                        </li>
                                      
                                    </> :
                                    <>
                                        <li>
                                            <a className="dropdown-item" href="/login">
                                                Login
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/signup">
                                                Register
                                            </a>
                                        </li>
                                    </>
                                }



                            </ul>
                        </li>
                    </Navbar.Collapse>


                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;
