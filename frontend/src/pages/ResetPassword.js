import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import { registerUser, sendVerifycodeMail } from '../services/api/userAPI';
import { sendResetPassword } from '../services/api/AuthApi';

function ResetPassword() {
    const navigate = useNavigate();
    const { Formik } = formik;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [variant, setVariant] = useState('info');
    const location = useLocation();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        newPassword: yup.string().min(3, "Please enter at least 3 characters").required(),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], "Passwords must match").required(),
        code: yup.string().required("Verification code is required"),
    });

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            await sendResetPassword(values.email, values.newPassword, values.confirmPassword,values.code);
            setVariant("success");
            setErrorMessage("Password changed successfully!");
            setTimeout(() => {
                setErrorMessage(null);
                navigate("/login");
            }, 3000);
        } catch (error) {
            const errorObj = error.response.data;
            console.log("err reset :", errorObj);
            setVariant('warning');
            setErrorMessage(errorObj['Error Message']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h2 className="fw-bold mb-2 text-uppercase">Ultimate Learning</h2>
                <p className="mb-5">Here is your reset password form!</p>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        email: location.state.email || '',
                        newPassword: '',
                        confirmPassword: '',
                        code: '',
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
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Verify Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        value={values.code}
                                        onChange={handleChange}
                                        isInvalid={touched.code && !!errors.code}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.code}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            {errorMessage && (
                                <Alert variant={variant}>
                                    {errorMessage}
                                </Alert>
                            )}
                            <div className="d-grid">
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    {isLoading ? (<Spinner size="sm" />) : ("Submit")}
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

export default ResetPassword;