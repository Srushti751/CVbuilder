import React, { useState } from 'react';
import { Form } from 'react-bootstrap';


const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);
const regForfName = RegExp(/^[a-zA-Z '.-]*$/);
const regForMob = RegExp(/^[789][0-9]{9}/);


function Basicdetails(props) {
    


    const nextS = (e) => {
        e.preventDefault()
        props.nextStep()

    }
    
    return (
        <>
            <Form className="registerForm p-3">
                <h3>Basic Details</h3>
                <Form.Group className="mb-3">
                    <Form.Control type="text" value={props.name} onChange={(e) => props.setName(e.target.value)} placeholder="Fullname" />
                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{props.name == "" ? "" : regForfName.test(props.name) ? "" : "Please enter valid name"}</span>
               
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} placeholder="Email" />
                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{props.email == "" ? "" : regForEmail.test(props.email) ? "" : "Email is not valid, abc@gm.com"}</span>
               
                </Form.Group>


                <Form.Group className="mb-3" >
                    <Form.Control type="text" value={props.phone} onChange={(e) => props.setPhone(e.target.value)} placeholder="Phone" />
                    <span style={{ color: "#CE0000", fontSize: "16px" }}>{props.phone == "" ? "" : regForMob.test(props.phone) ? "" : "Valid mobile number"}</span>

                </Form.Group>
          
                <Form.Group className="mb-3" >
                    <Form.Control type="text" value={props.city} onChange={(e) => props.setCity(e.target.value)} placeholder="City" placeholder="City" />

                </Form.Group>

                

                <button className=" formBtn" variant="primary" onClick={nextS} >
                    Next
                </button><br />
            
                {props.editToggle ?
                    
                       <button className="sortByButton formBtn" onClick={props.updateInfo} >
                                Update
                            </button>
                          :
                       
                            <button  className="sortByButton formBtn" onClick={props.submitRes} >
                            Save & Proceed later
                            </button>
                }
              

            </Form>

        </>
    )
}

export default Basicdetails;
