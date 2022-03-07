import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useToast } from "@chakra-ui/toast"
// import axios from 'axios'
import { loginUser, registerUser } from '../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from "react-router-dom";


const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);
const regForfName = RegExp(/^[a-zA-Z '.-]*$/);


function Signup() {
    const [fname, setFName] = useState("")
    const [lname, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const toast = useToast()


    const dispatch = useDispatch()
    let history = useHistory();

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!fname || !email || !password || !confirm) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        else if (password !== confirm) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
            // alert("Password dont match")
        } else {
            const user = { fname, lname, email, password }
            dispatch(registerUser(user))
            console.log(user)
            alert("Registered")
            history.push('/login')
         
        }
    }






    return (
        <div>
            <Container className="bg-light">
                <Row>



                    <Col className="bg-light"  >
                        <Container className="p-5 registerStyle ">
                            <h2 className="mt-2 formHead ">Register</h2>

                            <Form className="">
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={fname} onChange={(e) => setFName(e.target.value)} placeholder="Enter first name" />
                                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{fname == "" ? "" : regForfName.test(fname) ? "" : "Please enter valid name"}</span>

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lname} onChange={(e) => setLName(e.target.value)} placeholder="Enter last name" />
                                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{lname == "" ? "" : regForfName.test(lname) ? "" : "Please enter valid name"}</span>

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{email == "" ? "" : regForEmail.test(email) ? "" : "Email is not valid, abc@gm.com"}</span>

                                </Form.Group>



                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{password == "" ? "" : regForPass.test(password) ? "" : "Password should contain 1 uppercase, digit , special char and should be 8 characters long"}</span>

                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Confirm</Form.Label>
                                    <Form.Control type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Password" />
                                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{confirm == "" ? "" : password == confirm ? "" : "Password does not match"}</span>

                                </Form.Group>



                                <Button variant="primary" onClick={submitHandler} type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup

