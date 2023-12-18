import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { UpdateUserAPI, UploadImageAPI } from "../../../services/api/AuthApi";
import { FormGroup, FormLabel, Card, Button, Modal } from "react-bootstrap";
import { Label } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileUpdateForm = ({ user, setReRender, setMessage }) => {
    const [file, setFile] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setOriginalFile(selectedFile);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folderName", "user");
            formData.append("folderPath", "images/user");

            let uploadedImage = null;
            if (file) {
                uploadedImage = await UploadImageAPI(formData);
            }
            const payload = {
                ...values,
                avatar: uploadedImage || user.avatar,
                userId: user.userId
            };
            const updateUserResponse = await UpdateUserAPI(payload);
            console.log("Update user response:", updateUserResponse);
            setMessage('Profile updated successfully');
            setReRender(true);
            setShowModal(false);
            userData.avatar = uploadedImage || user.avatar;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log("err update profile :", error);
            setMessage('Failed to update profile');
            setReRender(true);
            setShowModal(false);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setMessage('');
        setShowModal(false);
    };
    const handleShow = () => setShowModal(true);
    
    return (
        <div>
            <Card.Body>
                <Button variant="primary" onClick={handleShow}>
                    Update Profile
                </Button>

                <Modal show={showModal} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                name: user?.name || '',
                                dateOfBirth: user?.dateOfBirth || '',
                                email: user?.email || ''
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({
                                handleSubmit,
                                isSubmitting,
                                values,
                                setFieldValue,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label>Full Name</Label>
                                        <Field type="text" name="name" className="form-control" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date of Birth</Label>
                                        <br />
                                        <DatePicker
                                            selected={new Date(values.dateOfBirth)} // Provide the value for the DatePicker
                                            onChange={(date) => setFieldValue("dateOfBirth", date)} // Set the form field value on change
                                            dateFormat="yyyy-MM-dd" // Date format
                                            className="form-control" // Bootstrap class
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email Address</Label>
                                        <Field type="email" name="email" className="form-control" disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Profile Picture</Label>
                                        <input
                                            type="file"
                                            name="file"
                                            className="form-control-file"
                                            onChange={handleFileChange}
                                        />
                                    </FormGroup>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </div>
    );
};

export default ProfileUpdateForm;
