import React, { useState } from 'react';
import { Row, Col, Button, Form, Container, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';
function Register(props) {
    const [isLoading, setIsLoading] = useState(false);

    const { Formik } = formik;
    const schema = yup.object().shape({
        fullName: yup.string().required("Field is required"),
        email: yup.string().email().required(),
        city: yup.string().required(),
        password: yup.string().min(3, "Please, at least 3 character!...").required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "confirm password must match").required(),
        dob: yup
            .date()
            .max(new Date(), 'Date of birth cannot be in the future')
            .test('is-over-18', 'You must be at least 18 years old', function (value) {
                const dob = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                return age >= 18;
            })
            .required('Field is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            // Call the API function to register the user
            await console.log(values);
            // Optionally, you can redirect the user to a different page after successful registration
            // history.push('/login'); // Import useHistory from 'react-router-dom'
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <Container>
            <div className="register-container">
                <div className="register-content">
                    <h2 className="fw-bold mb-2 text-uppercase">Brand</h2>
                    <p className="mb-5">Here is your register form!</p>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            fullName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            city: '',
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
                                            isInvalid={!!errors.fullName}
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
                                            isInvalid={!!errors.email}
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
                                            isInvalid={!!errors.password}
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
                                            isInvalid={!!errors.confirmPassword}
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
                                            value={values.dob||''}
                                            onChange={handleChange}
                                            isInvalid={!!errors.dob}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dob}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Example: New York"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            isInvalid={!!errors.city}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
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
        </Container>
    );
}

export default Register;