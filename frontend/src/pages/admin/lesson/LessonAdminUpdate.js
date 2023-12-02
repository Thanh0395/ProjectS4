import React, { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { fetchLessonByIdDashboard, listCategory } from '../../../services/api/lessonApi'
import QuestionEditor from '../../../components/admin/QuestionEditor';
import TagsEdittor from '../../../components/admin/TagsEdittor';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import env from '../../../environment.json';

function LessonAdminUpdate(props) {
    const [lesson, setLesson] = useState();
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState([]);
    const [deletedQuestions, setDeletedQuestions] = useState([]);
    const [initQuestions, setInitQuestions] = useState([]);
    const urlMedia = env.urls.media;

    function updateQuestion(ques) {
        setQuestions(ques);
    }
    function updateDeletedQuestion(delQues) {
        setDeletedQuestions(delQues);
    }
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await fetchLessonByIdDashboard(params.id);
                console.log("hello ", postData)
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
        price: yup.number().min(5).required(),
        content: yup.string().required(),
        newImage: yup
            .mixed().nullable()
            .test('filesize', 'Image is too large >1MB', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const maxSize = 1000000; // 1MB
                return file.size <= maxSize;
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
                const supportedFormats = ['video/mp4'];
                return supportedFormats.includes(file.type);
            }),
        tags: yup
            .array(),

    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            // Call the API function to register the user
            await console.log(values);
            await console.log('Questions', questions);
            await console.log('DeletedQuestion', deletedQuestions);
            console.log(values.categoryId)
            // Optionally, you can redirect the user to a different page after successful registration
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <div className="">
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
                                        <img src={urlMedia + lesson.featureImage} alt="Lesson" style={{ width: '150px' }} /><br />
                                        <Form.Label style={{ fontStyle: 'italic', color: 'blue' }}> or New Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="newImage"
                                            onChange={(event) => {
                                                // Set the selected file as the value(in the list file)
                                                setFieldValue('newImage', event.currentTarget.files[0]);
                                            }}
                                            isInvalid={touched.newImage && !!errors.newImage}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newImage}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" >
                                        <video width="320" height="240" controls>
                                            <source src={urlMedia + lesson.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <br />
                                        <Form.Label style={{ fontStyle: 'italic', color: 'blue' }}> or New Video</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="newVideo"
                                            onChange={(event) => {
                                                setFieldValue('newVideo', event.currentTarget.files[0]);
                                            }}
                                            isInvalid={touched.newVideo && !!errors.newVideo}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newVideo}
                                        </Form.Control.Feedback>
                                    </Form.Group>


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
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label className='title'>Content</Form.Label>
                                        <ReactQuill
                                            name="content"
                                            value={values.content}
                                            onChange={(val) => setFieldValue('content', val)}
                                            isInvalid={touched.content && !!errors.content}
                                        />
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

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Update")}
                                    </Button>
                                    <p className="m-3 text-center">
                                        <Link to="/admin/lessons" >Back</Link>
                                    </p>
                                </div>
                                <Form.Group as={Col} md="12">
                                    <TagsEdittor lessonTags={tags}></TagsEdittor>
                                    {/* <Form.Control.Feedback type="invalid">
                                            {errors.tags}
                                        </Form.Control.Feedback> */}
                                </Form.Group>
                                <Row>
                                    <QuestionEditor
                                        updateQuestion={updateQuestion}
                                        updateDeletedQuestion={updateDeletedQuestion}
                                        initQuestions={initQuestions}
                                    />
                                </Row>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default LessonAdminUpdate;