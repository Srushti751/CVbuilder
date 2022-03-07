import React from 'react';
import Pdf from "react-to-pdf"
import { Container } from 'react-bootstrap';

const ref = React.createRef();
function PDF(props) {
    return (
        <>

        <Container className="pdfStyle pdfEditor m-3">
                <div>
              
                            <>
                           
                                    <div className="text-center">
                                        <h3 >{props.name}</h3>
                                        <p><span>Email: </span>{props.email}<br/>
                                        <span>Contact: </span>{props.phone}<br/>
                                        <span>City: </span>{props.city}</p>
                                    </div>
                                    
                             
                            <hr/>
                                    <div className="m-3" >
                                        <h3 className="bg-light">Education</h3>
                                        <p><span>{props.qualification} </span>({props.year})<br/>
                                        {props.college}<br/>
                                       
                                        <span>Description:</span> {props.description}</p>
                                    </div>
                                
                                    <div className="m-3" >
                                        <h3 className="bg-light">Experience</h3>
                                        <p><span>{props.position} </span>({props.duration} years)<br/>
                                        {props.inst}<br/>
                                       
                                        <span>Description:</span> {props.desc}</p>
                                    </div>
                                
                                    <div className="m-3" >
                                        <h3 className="bg-light">Project</h3>
                                        <p><span>{props.title} </span><br/>
                                        <a>{props.link}</a><br/>
                                       
                                        <span>Description:</span> {props.projdesc}</p>
                                    </div>
                                
                                    <div className="m-3" >
                                        <h3 className="bg-light">Skills</h3>
                                        
                                       
                                        <p><span>Technical:</span> {props.techSkills}</p>
                                        <p><span>Interpersonal:</span> {props.interSkills}</p>
                                    </div>
                                

                            
                            </>
                        )



                </div>
               
               
            </Container>
       
        </>

    )
  
}

export default PDF;
