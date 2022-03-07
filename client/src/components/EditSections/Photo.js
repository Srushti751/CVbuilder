import React,{useState} from 'react';
import { Container, Form, Col, Row, Card } from 'react-bootstrap'
import axios from 'axios'

function Photo() {
    const [profileImg, setProfileImg] = useState("")
    const [uploadedFile, setUploadedFile] = useState(null)


    const changeProfileImage = (event) => {

        setUploadedFile(event.target.files[0]);
    }
    const UpdateProfileHandler = (e) => {
        e.preventDefault();
        //create object of form data
        const formData = new FormData();
        formData.append("profileImage", uploadedFile);
       


        const data = JSON.parse(localStorage.getItem("currentUser"))
     
        localStorage.setItem('currentUser', JSON.stringify(data))
    
        axios.put("/api/users/updateProfile", formData, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            setProfileImg(res.data.results.profileImage);
         
            window.location.reload();
            
        }).catch(err => console.log(err))
    }
    return (
        <Form>
        <Form.Group controlId="formCategory4">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" name="profileImage" onChange={changeProfileImage} />
        </Form.Group>
        <button onClick={UpdateProfileHandler} className="btn btn-dark">Save</button>

        </Form>
    );
}

export default Photo;
