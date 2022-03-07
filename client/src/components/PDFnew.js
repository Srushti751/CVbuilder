import React from 'react';
import Pdf from "react-to-pdf"
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

const ref = React.createRef();
function PDFnew(props) {
    return (
        <>
            <Container className="pdfStyle">
                <div>

                    {props.invData.map((data) => {
                        return (
                            <>
                                {data.basicdetails.map((bas) => {
                                    return (
                                        <div className="text-center">
                                            <h3 >{bas.name}</h3>
                                            <p><span>Email: </span>{bas.email}<br />
                                                <span>Contact: </span>{bas.phone}<br />
                                                <span>City: </span>{bas.city}</p>
                                        </div>

                                    )

                                })}
                                <hr />
                                <h3 className="bg-light">Education</h3>

                                {data.edudetails.map((edu) => {
                                    return (
                                        <div className="m-3" >
                                            <p><span>{edu.qualification} </span>({edu.year})<br />
                                                {edu.college}<br />

                                                <span>Description:</span> {edu.description}</p>
                                        </div>
                                    )

                                })}
                                
                                {data.edudetailsArr.map((edu) => {
                                    return (
                                        <div className="m-3" >
                                            <p><span>{edu.qualification} </span>({edu.year})<br />
                                                {edu.college}<br />

                                                <span>Description:</span> {edu.description}</p>
                                        </div>
                                    )

                                })}
                                <h3 className="bg-light">Experience</h3>

                                {data.expdetails.map((exp) => {
                                    return (
                                        <div className="m-3" >
                                            <p><span>{exp.position} </span>({exp.duration} years)<br />
                                                {exp.inst}<br />

                                                <span>Description:</span> {exp.desc}</p>
                                        </div>
                                    )

                                })}
                                   {data.expdetailsArr.map((edu) => {
                                    return (
                                        <div className="m-3" >
                                            <p><span>{edu.position} </span>({edu.duration} years)<br />
                                                {edu.inst}<br />

                                                <span>Description:</span> {edu.desc}</p>
                                        </div>
                                    )

                                })}
                                <h3 className="bg-light">Project</h3>

                                {data.projdetails.map((pro) => {
                                    return (
                                        <div className="m-3" >
                                            <p><span>{pro.title} </span><br />
                                                <a>{pro.link}</a><br />

                                                <span>Description:</span> {pro.projdesc}</p>
                                        </div>
                                    )

                                })}
                                <h3 className="bg-light">Skills</h3>

                                {data.skilldetails.map((skill) => {
                                    return (
                                        <div className="m-3" >


                                            <p><span>Technical:</span> {skill.techSkills}</p>
                                            <p><span>Interpersonal:</span> {skill.interSkills}</p>
                                        </div>
                                    )

                                })}


                            </>
                        )

                    })}


                </div>


            </Container>
        </>

    )

}

export default PDFnew;
