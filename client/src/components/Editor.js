import React, { useState } from 'react';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import PDF from './PDF';
import axios from 'axios'
import Basicdetails from './EditSections/Basicdetails';
import Educationdetails from './EditSections/Educationdetails';
import Experiencedetails from './EditSections/Experiencedetails';
import Projectdetails from './EditSections/Projectdetails';
import Skilldetails from './EditSections/Skilldetails';
import { saveAs } from 'file-saver';
import Popup from './Popup/Popup'
import DoneIcon from '@mui/icons-material/Done';




function Editor() {

    const [success, setSuccess] = useState(false)

    //Basic details
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    //Eductaion details
    const [college, setCollege] = useState("");
    const [year, setYear] = useState("");
    const [qualification, setQualification] = useState("");
    const [description, setDescription] = useState("");
    const [edu, setEdu] = useState([]);
    const [eduCount, setEduCount] = useState(1);

    //Experience details
    const [inst, setInst] = useState("");
    const [position, setPosition] = useState("");
    const [duration, setDuration] = useState("");
    const [desc, setDesc] = useState("");
    const [exp, setExp] = useState([]);
    const [expCount, setExpCount] = useState(1);




    //Project details
    const [title, setTitle] = useState("");
    const [projdesc, setProjdesc] = useState("");
    const [link, setLink] = useState("");

    //Skill details
    const [techSkills, setTechSkills] = useState("");
    const [interSkills, setInterSkills] = useState("");


    const [step, setStep] = useState(1);
    // const [phone, setPhone] = useState("");

    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const useremail = userData.email

    const nextStep = () => {
        setStep(step + 1)
    };

    const prevStep = () => {
        setStep(step - 1)
    };

    const addEdu = (e) => {
        e.preventDefault()

        setEdu([...edu, { college, year, qualification, description, }])
        setEduCount(eduCount+1)
        setCollege("")
        setYear("")
        setQualification("")
        setDescription("")
    }
    const addExp = (e) => {
        e.preventDefault()

        setExp([...exp, { inst, duration, position, desc, }])
        setExpCount(expCount+1)
        setInst("")
        setDuration("")
        setPosition("")
        setDesc("")
    }
    const submitRes = (e) => {
        e.preventDefault();

      

        const payload = {
            basicdetails: [{ name: name, email: email, phone: phone, city: city }],
            edudetails: [{ college: college, year: year, qualification: qualification, description: description }],
            edudetailsArr: edu,
            expdetails: [{ inst: inst, duration: duration, position: position, desc: desc }],
            expdetailsArr: exp,
            projdetails: [{ title: title, link: link, projdesc: projdesc }],
            skilldetails: [{ techSkills: techSkills, interSkills: interSkills }],
            email: useremail
            // basicdetails:[{name:name,phone:phone,city:city,email}]
        }

        axios({
            url: '/api/saveResume',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log("data is saved")
                afterClick()
            })
            .catch((err) => {
                console.log("Internal error")
            })
    }
    const afterClick = () => {
        setSuccess(true)
        setTimeout(() => {
            window.location.href = "/home";

        }, 3000);
    }
    const createAndDownloadPdf = () => {
        const payload = {
            name: name, email: email, city: city, phone: phone,
            college: college, year: year, qualification: qualification, description: description,
            inst: inst, duration: duration, position: position, desc: desc,
            title: title, link: link, projdesc: projdesc,
            techSkills: techSkills, interSkills: interSkills
        };
        axios
            .post("/api/create-pdf", payload)
            .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });

                saveAs(pdfBlob, "resume.pdf");
            });
        console.log(payload);
    };

    switch (step) {
        case 1:
            return (
                <Container>
                    <Row>
                        <Col md={6}>

                            <Basicdetails nextStep={nextStep} name={name} email={email} phone={phone} city={city}
                                setCity={setCity} setName={setName} setEmail={setEmail} setPhone={setPhone} submitRes={submitRes} />

                        </Col>
                        <Col md={6}>
                            <PDF name={name} email={email} phone={phone} city={city} />
                        </Col>
                    </Row>
                </Container>

            );

        case 2:

            return (
                <Container>
                    <Row>
                        <Col md={6}>

                            <Educationdetails nextStep={nextStep} prevStep={prevStep}
                                college={college} year={year} description={description} qualification={qualification}
                                setCollege={setCollege} setYear={setYear} setDescription={setDescription} setQualification={setQualification}
                                submitRes={submitRes} addEdu={addEdu} eduCount={eduCount}
                            />
                            <Popup setOpenPopup={setSuccess} openPopup={success}>
                                <Card className="p-3 bg-light">
                                    <Card.Body >
                                        <h3>Details saved Successfully!!</h3>

                                    </Card.Body>
                                    <Card.Body className="shareIcons" >
                                        <DoneIcon className="text-center doneIcon   " />
                                    </Card.Body>
                                </Card>
                            </Popup>
                        </Col>
                        <Col md={6}>
                            <PDF name={name} email={email} phone={phone} city={city} address={address}
                                college={college} year={year} qualification={qualification}
                            />


                        </Col>
                    </Row>
                </Container>
            );
        case 3:

            return (
                <Container>
                    <Row>
                        <Col md={6}>

                            <Experiencedetails nextStep={nextStep} prevStep={prevStep}
                                inst={inst} duration={duration} desc={desc} position={position}
                                setInst={setInst} setDuration={setDuration} setPosition={setPosition} setDesc={setDesc}
                                submitRes={submitRes} addExp={addExp} expCount={expCount}
                            />
                            <Popup setOpenPopup={setSuccess} openPopup={success}>
                                <Card className="p-3 bg-light">
                                    <Card.Body >
                                        <h3>Details saved Successfully!!</h3>

                                    </Card.Body>
                                    <Card.Body className="shareIcons" >
                                        <DoneIcon className="text-center doneIcon   " />
                                    </Card.Body>
                                </Card>
                            </Popup>
                        </Col>
                        <Col md={6}>
                            <PDF name={name} email={email} phone={phone} city={city} address={address}
                                college={college} year={year} qualification={qualification}
                                inst={inst} duration={duration} desc={desc} position={position}
                            />


                        </Col>
                    </Row>
                </Container>
            );
        case 4:

            return (
                <Container>
                    <Row>
                        <Col md={6}>

                            <Projectdetails nextStep={nextStep} prevStep={prevStep}
                                title={title} link={link} projdesc={projdesc}
                                setTitle={setTitle} setLink={setLink} setProjdesc={setProjdesc}
                                submitRes={submitRes}
                            />
                            <Popup setOpenPopup={setSuccess} openPopup={success}>
                                <Card className="p-3 bg-light">
                                    <Card.Body >
                                        <h3>Details saved Successfully!!</h3>

                                    </Card.Body>
                                    <Card.Body className="shareIcons" >
                                        <DoneIcon className="text-center doneIcon   " />
                                    </Card.Body>
                                </Card>
                            </Popup>
                        </Col>
                        <Col md={6}>
                            <PDF name={name} email={email} phone={phone} city={city} address={address}
                                college={college} year={year} qualification={qualification}
                                inst={inst} duration={duration} desc={desc} position={position}
                                title={title} link={link} projdesc={projdesc}
                            />


                        </Col>
                    </Row>
                </Container>
            );

        case 5:

            return (
                <Container>
                    <Row>
                        <Col md={6}>

                            <Skilldetails nextStep={nextStep} prevStep={prevStep}
                                techSkills={techSkills} interSkills={interSkills}
                                setTechSkills={setTechSkills} setInterSkills={setInterSkills}
                                submitRes={submitRes}
                            />
                            <Popup setOpenPopup={setSuccess} openPopup={success}>
                                <Card className="p-3 bg-light">
                                    <Card.Body >
                                        <h3>Resume created Successfully!!</h3>

                                    </Card.Body>
                                    <Card.Body className="shareIcons" >
                                        <DoneIcon className="text-center doneIcon   " />
                                    </Card.Body>
                                </Card>
                            </Popup>
                        </Col>
                        <Col md={6}>

                            <PDF name={name} email={email} phone={phone} city={city} address={address}
                                college={college} year={year} qualification={qualification} description={description}
                                inst={inst} duration={duration} desc={desc} position={position}
                                title={title} link={link} projdesc={projdesc} techSkills={techSkills} interSkills={interSkills}
                            />

                            <button className="sortByButton m-2" onClick={() => createAndDownloadPdf()}>Download</button>

                        </Col>
                    </Row>
                </Container>
            );
    }

}

export default Editor;
