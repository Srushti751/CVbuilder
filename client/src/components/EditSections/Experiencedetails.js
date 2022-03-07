
import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Experiencedetails(props) {


    const back = (e) => {
        e.preventDefault();
        props.prevStep()
    }
    const nextS = (e) => {
        e.preventDefault()
        props.nextStep()

    }
 
    return (
        <>
            <Form className="registerForm p-3">
                <h3>Experience Details</h3>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <h3><b> <FontAwesomeIcon icon={faCheckCircle} size="sm" />{props.expCount}</b></h3>
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Institute*</label>
                        <input type="text" name="edu1_school" className="form-control" value={props.inst} onChange={(e) => props.setInst(e.target.value)} />
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Position*</label>
                        <input type="text" name="edu1_year" className="form-control" value={props.position} onChange={(e) => props.setPosition(e.target.value)} />
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Duration*</label>
                        <input type="text" name="edu1_qualification" className="form-control" value={props.duration} onChange={(e) => props.setDuration(e.target.value)} />
                    </div>

                </div>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <label>Description</label>
                        <input type="text" name="edu2_desc" className="form-control" value={props.desc} onChange={(e) => props.setDesc(e.target.value)} />
                    </div>
                </div>

                <div className="formButton">
                <button className="formBtn" onClick={props.addExp} >
                        Add More
                    </button>
                    <button variant="primary" className="formBtn" onClick={back} >
                        Prev
                    </button>
                    <button variant="primary" className="formBtn" onClick={nextS} >
                        Next
                    </button><br />
         
                    {props.editToggle ?

                        <button className="sortByButton formBtn" onClick={props.updateInfo} >
                            Update
                        </button>
                        :

                        <button className="sortByButton formBtn" onClick={props.submitRes} >
                            Save & Proceed later
                        </button>
                    }
                </div>
            </Form>

        </>
    )


}

export default Experiencedetails;

