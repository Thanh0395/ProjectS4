import React, { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { fetchLessonByIdDashboard, listCategory } from '../../../services/api/lessonApi'
import QuestionEditor from '../../../components/admin/QuestionEditor';
import TagsEditor from '../../../components/admin/TagsEditor';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import env from '../../../environment.json';
import CircularProgress from '@mui/material/CircularProgress'

function LessonAdminDetail(props) {
    const [lesson, setLesson] = useState();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [initQuestions, setInitQuestions] = useState([]);
    const urlMedia = env.urls.media;

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

    return (
        <div className="container">
            <div className="">
                <h2 className="fw-bold mb-2 text-uppercase">Detail page</h2>
                <p className="mb-5">Here is your detail!</p>
                {lesson ? (
                    <Formik
                        validationSchema={schema}
                        initialValues={{ ...lesson }}
                    >
                        {({ values, touched, errors }) => (
                            // noValidate: bỏ qua validate mặc định của browser
                            <Form >
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label className='title'>Title</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="text"
                                            name="title"
                                            value={values.title}
                                        />

                                    </Form.Group>

                                    <Form.Group as={Col} md="6" >
                                        <Form.Label className='title'>Category</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="text"
                                            name="categoryId"
                                            as="select"
                                            value={values.categoryId}
                                        >
                                            {categories.map((category, index) =>
                                                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                            )}
                                        </Form.Control>

                                    </Form.Group>

                                    <Form.Group as={Col} md="6" >
                                        <img className='mt-2' src={urlMedia + lesson.featureImage} alt="Lesson" style={{ width: '90%' }} /><br />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" >
                                        <video className='mt-2' width="90%" controls>
                                            <source src={urlMedia + lesson.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label className='title'>Price</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="number"
                                            name="price"
                                            value={values.price}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label className='title'>Prize</Form.Label>
                                        <Form.Control
                                            disabled
                                            type="number"
                                            name="prize"
                                            value={values.prize}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label className='title'>Content</Form.Label>
                                        <div style={{ 'height': '300' }} >
                                            <ReactQuill
                                                disabled
                                                name="content"
                                                style={{ 'height': '250px' }}
                                                value={values.content}
                                            />
                                        </div>

                                    </Form.Group>
                                </Row>
                                <br></br>
                                <br></br>
                                <div className="text-center d-grid mb-2">
                                    <Link to="/admin/lessons">
                                        <Button variant="primary" style={{ color: 'white' }}>Back</Button>
                                    </Link>
                                </div>
                                <Form.Group as={Col} md="12">
                                    <TagsEditor postId={lesson.id} lessonTags={tags} />
                                </Form.Group>
                                <Row>
                                    <QuestionEditor
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

export default LessonAdminDetail;