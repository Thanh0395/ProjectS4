import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, FloatingLabel, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';

function Login(props) {
    const [isLoading, setIsLoading] = useState(false);

    const { Formik } = formik;
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3, "Please, at least 3 character!...").required(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            // Call the API function to register the user
            await console.log(values);
            // Optionally, you can redirect the user to a different page after successful registration
            // history.push('/login'); // Import useHistory from 'react-router-dom'
            console.log('Login successful');
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };


    // const { checkLogin, setCheckLogin } = props
    // const initialState = {
    //     email: "",
    //     password: "",
    // };
    // const [dataLogin, setDataLogin] = useState(initialState);
    // const navigate = useNavigate();
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value);
    //     setDataLogin({
    //         ...dataLogin,
    //         [name]: value,
    //     });
    // };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post("http://localhost:5270/api/Auth", dataLogin)
    //         .then(data => {
    //             if (data.status === 200) {
    //                 localStorage.setItem("token", data.data.token)
    //                 localStorage.setItem("userToken", JSON.stringify(data.data.userToken))
    //                 setCheckLogin(!checkLogin)
    //                 navigate('/dashboard')
    //             }
    //         })
    //         .catch(error => console.log(error))
    // }
    return (
        <Container>
            <div className="login-container">
                <div className="login-content">
                    <h2 className="fw-bold mb-2 text-uppercase">Brand</h2>
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

        // <div className="container mt-3">
        //     <h2>Login Form</h2>
        //     <form onSubmit={handleSubmit} method="post">
        //         <div className="mb-3 mt-3">
        //             <label htmlFor="email">Email:</label>
        //             <input type="email" className="form-control" id="email" placeholder="Enter email"
        //              name="email" value={dataLogin.email} onChange={handleInputChange} />
        //         </div>
        //         <div className="mb-3">
        //             <label htmlFor="password">Password:</label>
        //             <input type="password" className="form-control" id="password" placeholder="Enter password"
        //              name="password" value={dataLogin.password} onChange={handleInputChange} />
        //         </div>
        //         <button type="submit" className="btn btn-primary">Submit</button>
        //     </form>
        // </div>
    );
}

export default Login;