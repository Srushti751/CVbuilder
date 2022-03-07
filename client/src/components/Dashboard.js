import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col, Row, Table } from 'react-bootstrap';
import axios from 'axios'
import { saveAs } from 'file-saver';
import PDFnew from './PDFnew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from 'react-router-dom';

function Dashboard() {

    const [resumes, setResumes] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [invData, setInvData] = useState([]);

    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const useremail = userData.email
    const getResume = () => {

        axios.get(`/api/getResume/${useremail}`).then((res) => setResumes(res.data))
    }

    useEffect(() => {
        getResume()
    }, []);

    const gotoResume = (id) => {
        axios.get(`/api/resumedata/${id}`)
            .then((response) => {
                const data = response.data
                console.log(data)
                setInvData(data)
                setToggle(!toggle)
            })
            .catch((err) => {
                console.log("Fetch error", err)
            })
    }

    const createAndDownloadPdf = (inv) => {
        const payload = {
            name: inv.basicdetails[0].name,
            email: inv.basicdetails[0].email,
            city: inv.basicdetails[0].city,
            phone: inv.basicdetails[0].phone,
            college: inv.edudetails[0].college,
            year: inv.edudetails[0].year,
            qualification: inv.edudetails[0].qualification,
            description: inv.edudetails[0].description,
            inst: inv.expdetails[0].inst,
            duration: inv.expdetails[0].duration,
            position: inv.expdetails[0].position,
            desc: inv.expdetails[0].desc,
            title: inv.projdetails[0].title,
            link: inv.projdetails[0].link,
            projdesc: inv.projdetails[0].projdesc,
            techSkills: inv.skilldetails[0].techSkills,
            interSkills: inv.skilldetails[0].interSkills,
            edudetailsArr: inv.edudetailsArr,
            expdetailsArr: inv.expdetailsArr,


        };
        axios
            .post("/api/create-pdf", payload)
            .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });

                saveAs(pdfBlob, "res.pdf");
            });
        console.log(payload);
    };

    const deleteResume = (id) => {
        axios.delete(`/api/deleteResume/${id}`).then((res) => {

            window.location.reload();
        })

    }
    return (
        <>


            <Container className="p-5 invoiceStyle ">
                <div className="flex-box">
                    <div className="flex-boxCol">
                        <h1 className="">CVs</h1>
                        <p>Total {resumes.length} resumes</p>

                    </div>
                    {/* <button  className="btnStyle "><a href="/editor"> Create CV</a></button> */}
                    <a href="/editor "  className="btnStyle "> Create CV</a>

                </div>
                <InfiniteScroll
                    dataLength={resumes.length}
                    height={200}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            {/* <b>You have seen it all</b> */}
                        </p>
                    }
                >
                    <Table striped bordered hover className="tableStyle">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Name</th>
                                <th>Position</th>

                                <th>Status</th>
                                <th colSpan="3" className="text-center">Actions</th>

                            </tr>
                        </thead>
                        <tbody>

                            {resumes.map((inv) => {
                                return (
                                    <tr>
                                        <td>{inv.basicdetails.map((bas) => {
                                            return (
                                                <tr>
                                                    <td>{bas.name}</td>
                                                </tr>
                                            )
                                        })}</td>
                                        <td>{inv.expdetails.map((exp) => {
                                            return (
                                                <tr>
                                                    <td>{exp.position}</td>
                                                </tr>
                                            )
                                        })}</td>

                                        <td><button onClick={() => gotoResume(inv._id)} className="btn">
                                            <FontAwesomeIcon icon={faEye} size="lg" />

                                        </button></td>
                                        <td><button onClick={() => createAndDownloadPdf(inv)} className="btn">
                                            <FontAwesomeIcon icon={faDownload} className="downCol" size="lg" />
                                        </button></td>

                                    
                                        <td><Link to={`/updateResume/${inv._id}`}>
                                            <FontAwesomeIcon icon={faEdit} className="editCol" size="lg" />

                                        </Link></td>
                                        <td><Link onClick={() => deleteResume(inv._id)}>
                                            <FontAwesomeIcon icon={faTrash} className="delCol" size="lg" />

                                        </Link></td>

                                    </tr>
                                )
                            })}

                        </tbody>

                    </Table>
                </InfiniteScroll>

            </Container>
            <Container className="mt-5">
                {toggle ?
                    <PDFnew invData={invData} /> : ""

                }
            </Container>
        </>
    )
}

export default Dashboard;
