import React, { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { fetchLessonByIdDashboard, listCategory, updateLesson } from '../../../services/api/lessonApi'
import QuestionEditor from '../../../components/admin/QuestionEditor';
import TagsEditor from '../../../components/admin/TagsEditor';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import env from '../../../environment.json';
import { uploadFile } from '../../../services/api/fileApi';
import CircularProgress from '@mui/material/CircularProgress';
import './lesson.css'

function LessonAdminUpdate(props) {
    const [lesson, setLesson] = useState();
    // const [fileImage, setFileImage] = useState();
    // const [fileVideo, setFileVideo] = useState();
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState([]);
    const [deletedQuestions, setDeletedQuestions] = useState([]);
    const [initQuestions, setInitQuestions] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const [alertMsg, setAlertMsg] = useState();
    const [showInvalidContent, setShowInvalidContent] = useState(false);
    const [previewImageURL, setPreviewImageURL] = useState('');
    const [previewVideoURL, setPreviewVideoURL] = useState('');
    const urlMedia = env.urls.media;

    function updateQuestion(ques) {
        setQuestions(ques);
    }
    function updateDeletedQuestion(delQues) {
        setDeletedQuestions(delQues);
    }
    function updateTag(ques) {
        setTags(ques);
    }
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await fetchLessonByIdDashboard(params.id);
                const cateData = await listCategory();
                const tagsData = postData.tags;
                const questionsData = postData.questions;
                setLesson(postData);
                setCategories(cateData);
                setTags(tagsData);
                setInitQuestions(questionsData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [params.id]);

    const [isLoading, setIsLoading] = useState(false);// loading nay khi submit form
    const { Formik } = formik;
    const schema = yup.object().shape({
        title: yup.string().required(),
        categoryId: yup.number().required(),
        price: yup.number().min(30).required(),
        prize: yup.number().min(10).max(500).required(),
        content: yup.string().required(),
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
        newVideo: yup
            .mixed().nullable()
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
            setShowAlert(false);
            // Call the API function to register the user
            var featureImage = '';
            var video = '';
            if (values.newImage) {
                featureImage = await uploadFile(values.newImage, 'post', 'images/post');
            }
            if (values.newVideo) {
                video = await uploadFile(values.newVideo, 'post', 'video/post');
            }
            if (!showInvalidContent) {
                await updateLesson(lesson.id, values.categoryId, values.title, values.content, values.price, values.prize, featureImage, video);
                setShowAlert(true);
                setVariant('success');
                setAlertMsg('Update has been Successful.');
            }
            // await ('Questions', questions);
            // await ('DeletedQuestion', deletedQuestions);
            // console.log(questions)
            // console.log(tags)
            // Optionally, you can redirect the user to a different page after successful registration
        } catch (error) {
            setShowAlert(true);
            setVariant('danger');
            setAlertMsg('Fail: ', error);
            console.error('Registration error:', error);
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
                {lesson ? (
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{ ...lesson }}
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

                                    {/* <formik.FieldArray
                                        name="tags"
                                        render={(arrayHelpers) => (
                                            <div>
                                                {values.tags && values.tags.length > 0 ? (
                                                    values.tags.map((tag, index) => (
                                                        <div key={index}>
                                                            <Form.Control
                                                                type="number"
                                                                name="category"
                                                                as="select"
                                                                value={values.tags.id}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.category}
                                                            >
                                                                {categories.map((category, index) =>
                                                                    <option key={index} value={index}>{category}</option>
                                                                )}
                                                            </Form.Control>
                                                            <button
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                            >
                                                                -
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <button type="button" onClick={() => arrayHelpers.push("")}>
                                                        Add a Tags
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    /> */}

                                    <Form.Group as={Col} md="6" >
                                        <img className='mt-2' src={urlMedia + lesson.featureImage} alt="Lesson" style={{ width: '90%' }} /><br />
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
                                    <Form.Group as={Col} md="6" >
                                        <video className='mt-2' width="90%" controls>
                                            <source src={urlMedia + lesson.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <Form.Label style={{ fontStyle: 'italic', color: 'blue' }}> or New Video</Form.Label>
                                        {previewVideoURL && <video className='mb-2' width="90%" controls>
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
                                        <p className={showInvalidContent ? 'admin-lesson-invalid mt-2' : 'admin-lesson-hidden mt-2'}>
                                            Not null content
                                        </p>
                                        <div style={{ 'height': '300' }} className={showInvalidContent ? 'admin-lesson-invalid-area' : ''}>
                                            <ReactQuill
                                                name="content"
                                                style={{ 'height': '250px' }}
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
                                        {/* <Form.Control
                                            type="text"
                                            name="description"
                                            as="textarea"
                                            value={values.description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.description}
                                        /> */}
                                        <Form.Control.Feedback type="invalid">
                                            {errors.content}
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                </Row>
                                <br></br>
                                <br></br>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Update")}
                                    </Button>
                                    <p className="m-3 text-center">
                                        <Link to="/admin/lessons" >Back</Link>
                                    </p>
                                </div>
                                {showAlert && <Alert variant={variant} dismissible>{alertMsg}</Alert>}
                                <Form.Group as={Col} md="12">
                                    <TagsEditor postId={lesson.id} lessonTags={tags} updateTag={updateTag}/>
                                    {/* <Form.Control.Feedback type="invalid">
                                            {errors.tags}
                                        </Form.Control.Feedback> */}
                                </Form.Group>
                                <Row>
                                    <QuestionEditor
                                        updateQuestion={updateQuestion}
                                        updateDeletedQuestion={updateDeletedQuestion}
                                        initQuestions={initQuestions}
                                        postId={lesson.id}
                                    />
                                </Row>
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

export default LessonAdminUpdate;