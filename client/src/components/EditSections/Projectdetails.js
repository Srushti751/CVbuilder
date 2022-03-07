
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Projectdetails(props) {


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
                <h3>Project Details</h3>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <h3><b> <FontAwesomeIcon icon={faCheckCircle} size="sm" />1</b></h3>
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Title*</label>
                        <input type="text" name="edu1_school" className="form-control" value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Link</label>
                        <input type="text" name="edu1_year" className="form-control" value={props.link} onChange={(e) => props.setLink(e.target.value)} />
                    </div>


                </div>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <label>Description</label>
                        <input type="text" name="edu2_desc" className="form-control" value={props.projdesc} onChange={(e) => props.setProjdesc(e.target.value)} />
                    </div>
                </div>
                <div className="formButton">


                    <button className="formBtn" onClick={back} >
                        Prev
                    </button>
                    <button className="formBtn" onClick={nextS} >
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

export default Projectdetails;

