import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { activeUser, fetchGameData, loginUser, sendVerifycodeMail } from '../services/api/userAPI';
import { sendVerifycodeMailForgotPassword } from '../services/api/AuthApi';

function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showVerifyCode, setShowVerifyCode] = useState(false);
    const [variant, setVariant] = useState('info');
    const [currentEmail, setCurrentEmail] = useState(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser ? currentUser.email : '';
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
            setCurrentEmail(values.email);
            if (values.verify !== '') {
                await activeUser(currentEmail, values.verify);
            }
            const userData = await loginUser(values.email, values.password);
            await fetchGameData(userData.user.userId);
            navigate('/');
        } catch (error) {
            const errorObj = error.response.data;
            const errorMsg = errorObj['Error Message'];
            if (errorMsg && errorMsg.includes('not active')) {
                setVariant('warning');
                setShowVerifyCode(true);
            } else setVariant('danger');
            setErrorMessage(errorMsg);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    const handleResendVerification = async () => {
        try {
            setIsLoading(true);
            await sendVerifycodeMail(currentEmail);
            setVariant('info');
            setErrorMessage('Verification code resent successfully.');
        } catch (error) {
            setVariant('danger');
            setErrorMessage('Error resending verification code.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                                verify: '',
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
                                    {/* Hung update */}
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    >
                                        <p className="small">
                                            <Link 
                                                to="/forgot-password" 
                                                className="text-primary"
                                            >
                                                Forgot password?
                                            </Link>
                                        </p>
                                    </Form.Group>
                                    {showVerifyCode && (
                                        <>
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
                                            <p className="small">
                                                <Link className="text-primary" onClick={handleResendVerification}>
                                                    Resend to mail {currentEmail}
                                                </Link>
                                            </p>
                                        </>
                                    )}
                                    {errorMessage && (
                                        <Alert variant={variant}>
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

        </>

    );
}

export default Login;