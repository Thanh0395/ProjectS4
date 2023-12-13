import React, { useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../services/api/fileApi';
import '../lesson/lesson.css'
import { addCategory } from '../../../services/api/categoryApi';

function CategoryAdminCreate(props) {
    const [category, setCategory] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const [alertMsg, setAlertMsg] = useState();
    const [previewImageURL, setPreviewImageURL] = useState('');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);// loading nay khi submit form
    const { Formik } = formik;
    const schema = yup.object().shape({
        categoryName: yup.string().required(),
        newImage: yup
            .mixed().nullable()
            .required('Image is required')
            .test('filesize', 'Image is too large >500kB', function (file) {
                const maxSize = 500000; // 1MB
                const valid = file.size <= maxSize;
                // if (valid) setFileImage(file);
                return valid;
            })
            .test('fileformat', 'Unsupported image format', function (file) {
                const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
                return supportedFormats.includes(file.type);
            }),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            setSubmitting(true);
            setShowAlert(false);
            const featureImage = await uploadFile(values.newImage, 'category', 'images/category');
            const response = await addCategory(values.categoryName, featureImage);
            if (response.status === 200) {
                const newCate = response.data;
                setCategory(newCate)
                setShowAlert(true);
                setVariant('success');
                setAlertMsg('Add successfully');
            } else if (response.status === 422) {
                setShowAlert(true);
                setVariant('danger');
                setAlertMsg('Some category had that name');
            } else {
                setShowAlert(true);
                setVariant('danger');
                setAlertMsg(response.data);
            }
        } catch (error) {
            setShowAlert(true);
            setVariant('danger');
            setAlertMsg('Fail create: ', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <div className="container">
            <div className="">
                <h2 className="fw-bold mb-2 text-uppercase">Create page</h2>
                <p className="mb-5">Here is your create form!</p>

                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{ ...category, categoryName: '', newImage: null }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                        // noValidate: bỏ qua validate mặc định của browser
                        <Form onSubmit={handleSubmit} >
                            <Row >
                                <Form.Group as={Col} >
                                    <Form.Label className='title'>Category Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="categoryName"
                                        value={values.categoryName}
                                        onChange={handleChange}
                                        isInvalid={touched.categoryName && !!errors.categoryName}
                                    >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.categoryName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} >
                                    <Row><Form.Label className='title mt-2'>Category Image</Form.Label></Row>
                                    {previewImageURL && <img className='mb-2' src={previewImageURL} alt="Lesson" style={{ width: '300px' }} />}
                                    <Form.Control
                                        className='mb-2'
                                        type="file"
                                        name="newImage"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setPreviewImageURL(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                setPreviewImageURL('');
                                            }
                                            setFieldValue('newImage', event.currentTarget.files[0]);
                                        }}
                                        isInvalid={touched.newImage || !!errors.newImage}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newImage}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>


                            {showAlert && <Alert variant={variant} dismissible>{alertMsg}</Alert>}
                            <div className="d-grid">
                                <Button variant="primary" type="submit" disabled={isLoading} >
                                    {isLoading ? (<Spinner size="sm"></Spinner>)
                                        : ("Add")}
                                </Button>
                                <p className="m-3 text-center">
                                    <Link to="/admin/categories" >Back</Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    );
}

export default CategoryAdminCreate;