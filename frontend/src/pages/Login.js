import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, FloatingLabel, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { loginUser } from '../services/api/userAPI';

function Login(props) {
    const [isLoading, setIsLoading] = useState(false);

    const { Formik } = formik;
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3, "Please, at least 3 character!...").required(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            //setIsLoading(true);
            // Call the API function to register the user
            const userData = await loginUser(values.email, values.password);
            console.log('Login successful', userData);
        } catch (error) {
            const errorObj = error.response.data;
            console.log('Login error:', errorObj['Error Message']);
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
                                email: '',
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
                                                isInvalid={!!errors.email}
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
                                                isInvalid={!!errors.password}
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