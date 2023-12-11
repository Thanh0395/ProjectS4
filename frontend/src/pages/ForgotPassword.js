import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import * as yup from 'yup';
import * as formik from 'formik';
import { sendVerifycodeMailForgotPassword } from '../services/api/AuthApi';

function ForgotPassword() {
    const { Formik } = formik;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentEmail, setCurrentEmail] = useState(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser ? currentUser.email : '';
    });
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required()
    });

    const handleVerifyForgotPassword = async (values) => {
        try {
            setIsLoading(true);
            await sendVerifycodeMailForgotPassword(values.email);
            setErrorMessage('Please check your email for the verification code.');
            setTimeout(() => {
                navigate('/reset-password', { state: { email: values.email } });
            }, 3000);
        } catch (error) {
            const errorObj = error.response.data;
            console.log("err reset :", errorObj);
            setErrorMessage(errorObj['Error Message']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2 className="fw-bold mb-2 text-uppercase">Ultimate Learning</h2>
                <p className="mb-5">Please enter your email to get the verification code!</p>
                <div className="mb-3">
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleVerifyForgotPassword}
                        initialValues={{
                            email: currentEmail
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form onSubmit={handleSubmit} method="post">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <FloatingLabel label="Email address">
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                            placeholder="name@example.com"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                {errorMessage && (
                                    <Alert variant="danger">
                                        {errorMessage}
                                    </Alert>
                                )}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Submit")}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-3">
                        <p className="mb-0  text-center">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary fw-bold">
                                Register
                            </Link>
                            . Back <Link to="/" >Home</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
