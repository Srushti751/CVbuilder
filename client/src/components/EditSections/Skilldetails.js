
import React, { useState } from 'react';
import { Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Skilldetails(props) {


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
                <h3>Skills</h3>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <h3><b> <FontAwesomeIcon icon={faCheckCircle} size="sm" />1</b></h3>
                    </div>
                    <h5>Technical Skills</h5>
                    <p>(Comma separated skills)</p>
                    <div className="col-lg-12 text-left">
                        <input type="text" name="edu2_desc" className="form-control" value={props.techSkills} onChange={(e) => props.setTechSkills(e.target.value)} />
                    </div>
                    <h5>Interpersonal Skills</h5>
                    <p>(Comma separated skills)</p>

                    <div className="col-lg-12 text-left">
                        <label>Description</label>
                        <input type="text" name="edu2_desc" className="form-control" value={props.interSkills} onChange={(e) => props.setInterSkills(e.target.value)} />
                    </div>



                </div>

                <div className="formButton">


                    <button className="formBtn" onClick={back} >
                        Prev
                    </button>

            
                    {props.editToggle ?

                        <button className="sortByButton formBtn" onClick={props.updateInfo} >
                            Update
                        </button>
                        :

                        <button className="sortByButton formBtn" onClick={props.submitRes} >
                            Save
                        </button>
                    }
                </div>
            </Form>

        </>
    )


}

export default Skilldetails;

