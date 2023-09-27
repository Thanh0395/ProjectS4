import React, { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { fetchCategories, fetchLessonById } from '../../api/lessonApi'
import QuestionEditor from '../../components/QuestionEditor';

function LessonAdminUpdate(props) {
    const [lesson, setLesson] = useState(null);
    const [categories, setCategories] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [deletedQuestions, setDeletedQuestions] = useState(null);
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
                const postData = await fetchLessonById(params.id);
                const cateData = await fetchCategories();
                setLesson(postData);
                setCategories(cateData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [params.id, categories]);

    const [isLoading, setIsLoading] = useState(false);// loading nay khi submit form
    const { Formik } = formik;
    const schema = yup.object().shape({
        title: yup.string().required(),
        category: yup.string().required(),
        price: yup.number().min(5).required(),
        description: yup.string().required(),
        image: yup
            .mixed().nullable()
            .test('filesize', 'File is too large', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const maxSize = 1000000; // 1MB
                return file.size <= maxSize;
            })
            .test('fileformat', 'Unsupported file format', function (file) {
                if (!file) {
                    return true; // Allow for empty or undefined values
                }
                const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
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
            await console.log('Questions',questions);
            await console.log('DeletedQuestion',deletedQuestions);
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
        <div className="">
            <div className="">
                <h2 className="fw-bold mb-2 text-uppercase">Update page</h2>
                <p className="mb-5">Here is your update form!</p>
                {lesson ? (
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{ ...lesson, image: null,tag:[{id:1,name:'hahaa'},{id:2,name:'test'}] }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                            // noValidate: bỏ qua validate mặc định của browser
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            isInvalid={!!errors.title}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="category"
                                            as="select"
                                            value={values.category}
                                            onChange={handleChange}
                                            isInvalid={!!errors.category}
                                        >
                                            {categories.map((category, index) =>
                                                <option key={index} value={category}>{category}</option>
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
                                        <img src={lesson.image} alt="Lesson" style={{ width: '150px' }} /><br />
                                        <Form.Label> or New Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            onChange={(event) => {
                                                setFieldValue('image', event.currentTarget.files[0]); // Set the selected file as the value
                                            }}
                                            isInvalid={!!errors.image}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.image}
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="6" >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                            isInvalid={!!errors.price}
                                        />
                                        <Form.Control.Feedback type="invalid" > 
                                            {errors.price}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            as="textarea"
                                            value={values.description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                <Row>
                                    <QuestionEditor updateQuestion={updateQuestion} updateDeletedQuestion={updateDeletedQuestion}></QuestionEditor>
                                </Row>
                                <div className="d-grid">
                                    <Button variant="primary" type="button" onClick={handleSubmit} disabled={isLoading} >
                                        {isLoading ? (<Spinner size="sm"></Spinner>)
                                            : ("Update")}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="mt-3">
                    <p className="mb-0  text-center">
                        <Link to="/admin/lessons" >Back</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LessonAdminUpdate;