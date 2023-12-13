import React, { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { addLesson, listCategory } from '../../../services/api/lessonApi'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from '../../../services/api/fileApi';
import './lesson.css'

function LessonAdminCreate(props) {
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    // const [fileImage, setFileImage] = useState();
    // const [fileVideo, setFileVideo] = useState();
    const [categories, setCategories] = useState([]);
    // const [questions, setQuestions] = useState([]);
    // const [tags, setTags] = useState([]);
    // const [deletedQuestions, setDeletedQuestions] = useState([]);
    // const [initQuestions, setInitQuestions] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(false);
    const [alertMsg, setAlertMsg] = useState(false);
    const [showInvalidContent, setShowInvalidContent] = useState(false);
    const [previewImageURL, setPreviewImageURL] = useState('');
    const [previewVideoURL, setPreviewVideoURL] = useState('');

    // function updateQuestion(ques) {
    //     setQuestions(ques);
    // }
    // function updateDeletedQuestion(delQues) {
    //     setDeletedQuestions(delQues);
    // }
    useEffect(() => {
        setLesson(null)
        const fetchData = async () => {
            try {
                const cateData = await listCategory();
                setCategories(cateData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, []);

    const [isLoading, setIsLoading] = useState(false);// loading nay khi submit form
    const { Formik } = formik;
    const schema = yup.object().shape({
        title: yup.string().required(),
        categoryId: yup.number().required(),
        price: yup.number().min(30).required(),
        prize: yup.number().min(10).max(500).required(),
        content: yup.string().required()
        // .test('is-non-empty', 'Content is required', function (value) {
        //     return value.trim() !== '';
        // })
        //     .required('Content is required')
        ,
        newImage: yup
            .mixed().required()
            .test('filesize', 'Image is too large >500kB', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const maxSize = 500000; // 1MB
                const valid = file.size <= maxSize;
                return valid;
            })
            .test('fileformat', 'Unsupported image format', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
                return supportedFormats.includes(file.type);
            }),
        newVideo: yup
            .mixed()
            .test('filesize', 'Video is too large >100MB', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const maxSize = 100000000; // 100MB
                return file.size <= maxSize;
            })
            .test('fileformat', 'Unsupported video format', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const supportedFormats = ['video/mp4', 'video/avi', 'video/mov', 'video/mpeg-4'];
                return supportedFormats.includes(file.type);
            }),
        tags: yup
            .array(),

    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            setSubmitting(true);
            if (values.content === '<p><br></p>') {
                setShowInvalidContent(true);
                throw new Error('Content is null');
            }
            // Call the API function to register the user
            var featureImage = '';
            var video = '';
            if (values.newImage) {
                featureImage = await uploadFile(values.newImage, 'post', 'images/post');
            }
            if (values.newVideo) {
                video = await uploadFile(values.newVideo, 'post', 'video/post');
            }
            const newId = await addLesson(values.categoryId, values.title, values.content, values.price, values.prize, featureImage, video);
            if (typeof newId === 'number') {
                navigate(`/admin/lessons/update/${newId}`);
            } else {
                setShowAlert(true);
                setVariant('danger');
                setAlertMsg('Error from server')
            }
            setShowInvalidContent(false)
            // Optionally, you can redirect the user to a different page after successful registration
        } catch (error) {
            console.error('Add error:', error.message);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <div className="container">
            <div className="">
                <h2 className="fw-bold mb-2 text-uppercase">Add new page</h2>
                <p className="mb-5">Here is your add form!</p>

                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{ ...lesson, title: '', categoryId: 1, content: '', price: 0, prize: 0, newImage: null, newVideo: null }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                        // noValidate: bỏ qua validate mặc định của browser
                        <Form onSubmit={handleSubmit} >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" >
                                    <Form.Label className='title'>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        isInvalid={touched.title && !!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="6" >
                                    <Form.Label className='title'>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="categoryId"
                                        as="select"
                                        value={values.categoryId}
                                        onChange={handleChange}
                                        isInvalid={touched.category && !!errors.category}
                                    >
                                        {categories.map((category, index) =>
                                            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                        )}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.category}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" >
                                    <p><Form.Label className='title'> Image</Form.Label></p>
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
                                <Form.Group as={Col} md="6" >
                                    <p><Form.Label className='title'>Video</Form.Label></p>
                                    {previewVideoURL && <video width="90%" controls>
                                        <source src={previewVideoURL} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>}
                                    <Form.Control
                                        type="file"
                                        name="newVideo"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setPreviewVideoURL(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                setPreviewVideoURL('');
                                            }
                                            setFieldValue('newVideo', event.currentTarget.files[0]);
                                        }}
                                        isInvalid={touched.newVideo && !!errors.newVideo}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newVideo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" >
                                    <Form.Label className='title'>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={touched.price && !!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" >
                                    <Form.Label className='title'>Prize</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="prize"
                                        value={values.prize}
                                        onChange={handleChange}
                                        isInvalid={touched.prize && !!errors.prize}
                                    />
                                    <Form.Control.Feedback type="invalid" >
                                        {errors.prize}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label className='title'>Content</Form.Label>
                                    <div style={{ 'height': '300px' }} className={showInvalidContent ? 'admin-lesson-invalid-area' : ''}>
                                        <ReactQuill
                                            name="content"
                                            style={{ 'height': '250px' }}
                                            required
                                            value={values.content}
                                            onChange={(val) => {
                                                if (val === '<p><br></p>') {
                                                    setShowInvalidContent(true)
                                                } else setShowInvalidContent(false);
                                                setFieldValue('content', val);
                                            }}
                                            isInvalid={touched.content && !!errors.content}
                                        />
                                    </div>
                                    <p className={showInvalidContent ? 'admin-lesson-invalid mt-2' : 'admin-lesson-hidden mt-2'}>
                                        Not null content
                                    </p>
                                </Form.Group>
                            </Row>
                            <Row className="d-grid">
                                <Button variant="primary" type="submit" disabled={isLoading} >
                                    {isLoading ? (<Spinner size="sm"></Spinner>)
                                        : ("Add")}
                                </Button>
                                <p className="m-3 text-center">
                                    <Link to="/admin/lessons" >Back</Link>
                                </p>
                            </Row>
                            {showAlert ?
                                <Alert variant={variant} dismissible>{alertMsg}</Alert>
                                : <></>
                            }
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    );
}

export default LessonAdminCreate;