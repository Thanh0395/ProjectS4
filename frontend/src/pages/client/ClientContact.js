import React, { useState } from 'react';
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';

function ClientContact(props) {
    const [isLoading, setIsLoading] = useState(false);

    const { Formik } = formik;
    const schema = yup.object().shape({
        fullName: yup.string().required("name is required"),
        email: yup.string().email().required(),
        message: yup.string().required(),
    });
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            // Call the API function to register the user
            await console.log(values);
            // Optionally, you can redirect the user to a different page after successful 
            // history.push('/login'); // Import useHistory from 'react-router-dom'
            console.log('Successful');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <>
            <Row>
                <Col md={6}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9294706857263!2d106.69482797481876!3d10.81670945844982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ec824b2db3%3A0x23dfd92c29269357!2zMTIgVHLhuqduIFF1w70gQ8OhcCwgUGjGsOG7nW5nIDExLCBCw6xuaCBUaOG6oW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1694336787733!5m2!1sen!2s"
                        title="mymap"
                        width="100%" height="450"
                        style={{ border: "0", padding: "5px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            fullName: '',
                            email: '',
                            message: '',
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            // noValidate: bỏ qua validate mặc định của browser
                            <Form noValidate onSubmit={handleSubmit}>
                                <h2 className="fw-bold mb-2">Leave us a message</h2>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" >
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.fullName}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" >
                                        <Form.Label>Your message</Form.Label>
                                        <Form.Control
                                            as="textarea" rows={4}
                                            type="text"
                                            name="message"
                                            value={values.message}
                                            onChange={handleChange}
                                            isInvalid={!!errors.message}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Send")}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>

        </>
    );
}

export default ClientContact;