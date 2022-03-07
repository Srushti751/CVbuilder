
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import PDF from './PDF';
import axios from 'axios'
import Basicdetails from './EditSections/Basicdetails';
import Educationdetails from './EditSections/Educationdetails';
import Experiencedetails from './EditSections/Experiencedetails';
import Projectdetails from './EditSections/Projectdetails';
import Skilldetails from './EditSections/Skilldetails';
import { saveAs } from 'file-saver';



function ResumeEdit(props) {

    const rid = props.match.params.rid
    const [Resume, setResume] = useState([])
    const [editToggle, setEditToggle] = useState(true)


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

    //Eductaion details
    const [inst, setInst] = useState("");
    const [position, setPosition] = useState("");
    const [duration, setDuration] = useState("");
    const [desc, setDesc] = useState("");
    const [edu, setEdu] = useState([]);



    //Project details
    const [title, setTitle] = useState("");
    const [projdesc, setProjdesc] = useState("");
    const [link, setLink] = useState("");

    //Skill details
    const [techSkills, setTechSkills] = useState("");
    const [interSkills, setInterSkills] = useState("");


    const [step, setStep] = useState(1);
    const [status, setSTatus] = useState(0);
    // const [phone, setPhone] = useState("");

    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const useremail = userData.email

    const getResume = () => {
        axios.get(`/api/resume_by_id?id=${rid}`)
            .then(response => {
                setResume(response.data)
                setName(response.data[0].basicdetails[0].name);
                setEmail(response.data[0].basicdetails[0].email)
                setPhone(response.data[0].basicdetails[0].phone)
                setCity(response.data[0].basicdetails[0].city)
                setCollege(response.data[0].edudetails[0].college)
                setYear(response.data[0].edudetails[0].year)
                setQualification(response.data[0].edudetails[0].qualification)
                setDescription(response.data[0].edudetails[0].description)
                setInst(response.data[0].expdetails[0].inst)
                setPosition(response.data[0].expdetails[0].position)
                setDuration(response.data[0].expdetails[0].duration)
                setDesc(response.data[0].expdetails[0].desc)
                setTitle(response.data[0].projdetails[0].title)
                setLink(response.data[0].projdetails[0].link)
                setProjdesc(response.data[0].projdetails[0].projdesc)
                setTechSkills(response.data[0].skilldetails[0].techSkills)
                setInterSkills(response.data[0].skilldetails[0].interSkills)
            })
    }

    const updateInfo = () => {
        const resume = { 
        basicdetails: [{ name: name ,email:email,phone:phone,city:city}],
            edudetails: [{ college: college, year: year, qualification: qualification, description: description }],
            expdetails: [{ inst: inst, duration: duration, position: position, desc: desc }],
            projdetails: [{ title: title, link: link, projdesc: projdesc }],
            skilldetails: [{ techSkills: techSkills, interSkills: interSkills}],
            email:useremail
        }
        axios.put(`/api/updateResume/${rid}`, resume)
        alert("Resume updated")
       
    }
    useEffect(() => {
        getResume();
    }, []);

    const nextStep = () => {
        setStep(step + 1)
    };

    const prevStep = () => {
        setStep(step - 1)
    };

    const addEdu = (e) => {
        e.preventDefault()

        setEdu([...edu, { college, year, qualification, description, }])
        setCollege("")
    }
    const submitRes = (e) => {
        e.preventDefault();

        // if (!card) {
        //   toast("Please fill Card Details")
        //   return;
        // }
        // else 

        const payload = {
            basicdetails: [{ name: name, email: email, phone: phone, city: city }],
            edudetails: [{ college: college, year: year, qualification: qualification, description: description }],
            edudetailsArr: edu,
            expdetails: [{ inst: inst, duration: duration, position: position, desc: desc }],
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
            })
            .catch((err) => {
                console.log("Internal error")
            })
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

                            <Basicdetails nextStep={nextStep} updateInfo={updateInfo} name={name} email={email} phone={phone} city={city}
                                setCity={setCity} setName={setName} setEmail={setEmail} setPhone={setPhone} editToggle={editToggle} />
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
                                submitRes={submitRes} addEdu={addEdu} updateInfo={updateInfo} editToggle={editToggle}
                            />
                            {/* <UserForm/> */}
                        </Col>
                        <Col md={6}>
                            <PDF name={name} email={email} phone={phone} city={city} address={address}
                                college={college} year={year} qualification={qualification} description={description}
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
                                submitRes={submitRes} updateInfo={updateInfo} editToggle={editToggle}
                            />
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
                                submitRes={submitRes} updateInfo={updateInfo} editToggle={editToggle}
                            />
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
                                submitRes={submitRes} editToggle={editToggle}  updateInfo={updateInfo}
                            />
                        </Col>
                        <Col md={6}>
                            <PDF name={name} email={email} phone={phone} city={city} address={address}
                                college={college} year={year} qualification={qualification}
                                inst={inst} duration={duration} desc={desc} position={position}
                                title={title} link={link} projdesc={projdesc} description={description} techSkills={techSkills}
                                interSkills={interSkills}
                            />
                            <button onClick={() => createAndDownloadPdf()}>Dowloaad</button>


                        </Col>
                    </Row>
                </Container>
            );
    }

}

export default ResumeEdit;
