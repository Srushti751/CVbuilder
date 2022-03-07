
import React, { useState } from 'react';
import { Form, Button, Container, Col, Row , Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import DoneIcon from '@mui/icons-material/Done';


function Educationdetails(props) {
  

    const [toggle, setToggle] = useState(false);
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
                <h3>Education Details</h3>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <h3><b> <FontAwesomeIcon icon={faCheckCircle} size="sm" />{props.eduCount}</b></h3>
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>College*</label>
                        <input type="text" name="edu1_school" className="form-control" value={props.college} onChange={(e) => props.setCollege(e.target.value)} />
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Year*</label>
                        <input type="text" name="edu1_year" className="form-control" value={props.year} onChange={(e) => props.setYear(e.target.value)} />
                    </div>
                    <div className="col-lg-4 text-left">
                        <label>Qualification*</label>
                        <input type="text" name="edu1_qualification" className="form-control" value={props.qualification} onChange={(e) => props.setQualification(e.target.value)} />
                    </div>

                </div>
                <div className="row col-lg-10 mx-auto">
                    <div className="col-lg-12 text-left">
                        <label>Description</label>
                        <input type="text" name="edu2_desc" className="form-control" value={props.description} onChange={(e) => props.setDescription(e.target.value)} />
                    </div>
                </div>

                <div className="formButton">
                    <button className="formBtn" onClick={props.addEdu} >
                        Add More
                    </button>

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

export default Educationdetails;
