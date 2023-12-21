import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
import { registerUser, sendVerifycodeMail } from '../services/api/userAPI';
function Register(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { Formik } = formik;
    const schema = yup.object().shape({
        fullName: yup.string().required("Field is required"),
        email: yup.string().email().required(),
        password: yup.string().min(3, "Please, at least 3 character!...").required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "confirm password must match").required(),
        dob: yup
            .date()
            .max(new Date(), 'Date of birth cannot be in the future')
            .required('Date field is required'),
    });

    const [message, setMessage] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            const isRegisted = await registerUser(values.email, values.fullName, values.password, values.dob);
            if (isRegisted) {
                await sendVerifycodeMail(values.email);
            }
            setMessage('Registered successfully');
            setTimeout(() => {
                setMessage(null);
                navigate("/login");
            }, 1500);
        } catch (error) {
            const errorObj = error.response.data;
            setMessage(errorObj['Error Message']);
            console.log("errrr :", errorObj['Error Message']);
            console.log("errrr :", errorObj);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <>
            <div className="register-container">
                <div className="register-content">
                    <h2 className="fw-bold mb-2 text-uppercase">Ultimate Learning</h2>
                    <p className="mb-5">Here is your register form!</p>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            fullName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            // noValidate: bỏ qua validate mặc định của browser
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            isInvalid={touched.fullName && !!errors.fullName}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
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
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={values.dob || ''}
                                            onChange={handleChange}
                                            isInvalid={touched.dob && !!errors.dob}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dob}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                {message && (
                                    <Alert variant={message.includes('successfully') ? 'success' : 'danger'} onClose={() => setMessage('')} dismissible className="text-center">
                                        {message}
                                    </Alert>
                                )}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Register")}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-3">
                        <p className="mb-0  text-center">
                            Have an account?{" "}
                            <Link to="/login" className="text-primary fw-bold">
                                Login
                            </Link>
                            . Back <Link to="/" >Home</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;