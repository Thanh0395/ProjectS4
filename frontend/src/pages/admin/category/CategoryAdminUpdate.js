import React, { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import env from '../../../environment.json';
import { uploadFile } from '../../../services/api/fileApi';
import CircularProgress from '@mui/material/CircularProgress';
import '../lesson/lesson.css'
import { fetchCategoryById, updateCategory } from '../../../services/api/categoryApi';

function CategoryAdminUpdate(props) {
    const [category, setCategory] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const [alertMsg, setAlertMsg] = useState();
    const [previewImageURL, setPreviewImageURL] = useState('');
    const urlMedia = env.urls.media;

    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await fetchCategoryById(params.id);
                setCategory(postData.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchData();
    }, [params.id]);

    const [isLoading, setIsLoading] = useState(false);// loading nay khi submit form
    const { Formik } = formik;
    const schema = yup.object().shape({
        categoryId: yup.number(),
        categoryName: yup.string().required(),
        newImage: yup
            .mixed().nullable()
            .test('filesize', 'Image is too large >500kB', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const maxSize = 500000; // 1MB
                const valid = file.size <= maxSize;
                // if (valid) setFileImage(file);
                return valid;
            })
            .test('fileformat', 'Unsupported image format', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
                return supportedFormats.includes(file.type);
            }),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            setSubmitting(true);
            setShowAlert(false);
            // Call the API function to register the user
            var featureImage = '';
            if (values.newImage) {
                featureImage = await uploadFile(values.newImage, 'category', 'images/category');
            }
            const response = await updateCategory(values.categoryId, values.categoryName, featureImage);
            if (response.status === 200) {
                setShowAlert(true);
                setVariant('success');
                setAlertMsg('Update successfully');
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
            setAlertMsg('Fail update: ', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <div className="container">
            <div className="">
                <h2 className="fw-bold mb-2 text-uppercase">Update page</h2>
                <p className="mb-5">Here is your update form!</p>
                {category !== undefined ? (
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{ categoryId: category.categoryId, categoryName: category.categoryName }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                            // noValidate: bỏ qua validate mặc định của browser
                            <Form onSubmit={handleSubmit} >
                                <Row className="mb-3" hidden>
                                    <Form.Group as={Col}>
                                        <Form.Label className='title'>Category Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="categoryId"
                                            value={values.categoryId}
                                            onChange={handleChange}
                                            isInvalid={touched.categoryId && !!errors.categoryId}
                                            disabled
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.categoryId}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row >
                                    <Form.Group as={Col} md='12' >
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

                                    <Row>
                                        <Form.Group as={Col} md='6' >
                                            <Form.Label className='title'>Category Image</Form.Label>
                                            <img className='mt-2' src={urlMedia + category.featureImage} alt="Lesson" style={{ width: '90%' }} />
                                        </Form.Group>
                                        <Form.Group as={Col} md='6'>
                                            <Form.Label style={{ fontStyle: 'italic', color: 'blue' }}> or New Image</Form.Label>
                                            {previewImageURL && <img className='mb-2' src={previewImageURL} alt="Lesson" style={{ width: '90%' }} />}
                                            <Form.Control
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
                                                isInvalid={touched.newImage && !!errors.newImage}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newImage}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                </Row>

                                {showAlert && <Alert variant={variant} dismissible>{alertMsg}</Alert>}
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Update")}
                                    </Button>
                                    <p className="m-3 text-center">
                                        <Link to="/admin/categories" >Back</Link>
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className="loading-spinner">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryAdminUpdate;