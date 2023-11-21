import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Container, FloatingLabel, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { loginUser } from '../services/api/userAPI';

function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showVerifyCode, setShowVerifyCode] = useState(true);
    const [currentEmail, setCurrentEmail] = useState(()=>{
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser? currentUser.email : '';
    });
    const navigate = useNavigate();

    const { Formik } = formik;
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3, "Please, at least 3 character!...").required(),
        verify: yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            setCurrentEmail(values.email)
            // Call the API function to register the user
            await loginUser(values.email, values.password);
            if(localStorage.getItem('currentUser')){
                if(localStorage.getItem('currentUser').active){
                    console.log('true');
                }else{
                    console.log('false');
                }
            }
            navigate('/');
        } catch (error) {
            const errorObj = error.response.data;
            setErrorMessage(errorObj['Error Message']);
            // console.log('Login error:', errorObj['Error Message']);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <div className="login-container">
                <div className="login-content">
                    <h2 className="fw-bold mb-2 text-uppercase">Ultimate Learning</h2>
                    <p className="mb-5">Please enter your Email and Password!</p>
                    <div className="mb-3">
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleSubmit}
                            initialValues={{
                                email: currentEmail,
                                password: '',
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

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <FloatingLabel label="Password" >
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && !!errors.password}
                                                placeholder=""
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    >
                                        <p className="small">
                                            <a className="text-primary" href="#!">
                                                Forgot password?
                                            </a>
                                        </p>
                                    </Form.Group>
                                    {showVerifyCode && (
                                        <Form.Group className="mb-3" controlId="formBasicVerify">
                                            <FloatingLabel label="Verification Code">
                                                <Form.Control
                                                    type="text"
                                                    name="verify"
                                                    value={values.verify}
                                                    onChange={handleChange}
                                                    isInvalid={touched.verify && !!errors.verify}
                                                    placeholder="Enter verification code"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.verify}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    )}
                                    {errorMessage && (
                                        <Alert variant="danger">
                                            {errorMessage}
                                        </Alert>
                                    )}
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" disabled={isLoading} >
                                            {isLoading ? (<Spinner size="sm"></Spinner>)
                                                : ("Login")}
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

        </Container>

    );
}

export default Login;