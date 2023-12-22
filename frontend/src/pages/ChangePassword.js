import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import { sendChangePassword } from '../services/api/AuthApi';
import { logoutUser } from '../services/api/userAPI';

function ChangePassword() {

    const { Formik } = formik;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState('info');
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        newPassword: yup.string().min(3, "Please enter at least 3 characters").required(),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], "Passwords must match").required(),
        oldPassword: yup.string().required("Please enter this feild"),
    });

    const handleSubmit = async (values) => {
        try {

            console.log('Submitting form...', values);
            setIsLoading(true);
            await sendChangePassword(values.email, values.oldPassword, values.newPassword, values.confirmPassword);
            setVariant("success");
            setMessage('Password changed successfully!');
            logoutUser();
            setTimeout(() => {
                setMessage(null);
                navigate("/login");
            }, 1500);
        } catch (error) {
            const errorObj = error.response ? error.response.data : error.message;
            setVariant('warning');
            setMessage(errorObj['Error Message'] || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h2 className="fw-bold mb-2 text-uppercase">Ultimate Learning</h2>
                <p className="mb-5">Here is your change password form!</p>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        email: currentUser.email || '',
                        newPassword: '',
                        confirmPassword: '',
                        oldPassword: ''
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={touched.email && errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Old Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="oldPassword"
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.oldPassword && !!errors.oldPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.oldPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.newPassword && !!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {message && (
                                <Alert variant={variant} onClose={() => setMessage(null)} dismissible className="text-center">
                                    {message}
                                </Alert>
                            )}
                            <div className="d-grid">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="mt-3">
                    <p className="mb-0 text-center">
                        Have an account?{' '}
                        <Link to="/login" className="text-primary fw-bold">
                            Login
                        </Link>
                        . Back <Link to="/">Home</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;