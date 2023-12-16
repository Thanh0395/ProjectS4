import React, { useState } from 'react';
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import OpenAI from 'openai';
import key from '../../ultimateKey.json';

function Planning(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    const openAi = new OpenAI({ apiKey: key.apikey.chatGPT, dangerouslyAllowBrowser: true });

    const { Formik } = formik;
    const schema = yup.object().shape({
        ask: yup.string().required("Type anything"),
    });
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setIsLoading(true);
            const message = values.ask;
            // const response = await openAi.chat.completions.create({
            //     model: "davinci",
            //     messages: [{"role": "user", "content": message}],
            //     temperature: 0,
            //     max_tokens: 256,
            // });
            const response = await openAi.completions.create({
                model: "text-davinci-003",
                prompt: message,
                temperature: 0,
                max_tokens: 1000,
            });
            setQuestion(message);
            setAnswer(response.choices[0].text);
            resetForm();
            // console.log('Answer: ', response.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <div className='container'>
            <br />
            <Col className="align-items-center justify-content-center">
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        ask: '',
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <h2 className="fw-bold mb-2">AI Lesson plan writer</h2>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label style={{ fontStyle: 'italic' }}>
                                        <strong>Hint: </strong>
                                        Write a lesson plan for an introductory algebra class. The lesson plan should cover the distributive law, in particular how it works in simple cases involving mixes of positive and negative numbers. Come up with some examples that show common student errors.
                                        <br></br>
                                        <strong>or simple: </strong>
                                        What are Newton's 3 laws
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea" rows={4}
                                        type="text"
                                        name="ask"
                                        placeholder='Your message...'
                                        value={values.ask}
                                        onChange={handleChange}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit();
                                            }
                                        }}
                                        isInvalid={!!errors.ask}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ask}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <div className="d-grid">
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    {isLoading ? (<Spinner size="sm"></Spinner>) : ("Send")}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Col>
            {question && (
                <Row className="mt-2">
                    <Col>
                        <strong>Your question: </strong>{question}
                    </Col>
                </Row>
            )}
            {answer && (
                <Row className="mt-1" style={{ backgroundColor: 'var(--light-secondary-color)', borderRadius: '10px', padding: '10px' }}>
                    <Col>
                        <strong>Answer: </strong>
                        <div dangerouslySetInnerHTML={{ __html: answer }}></div>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default Planning;
// import java.net.URI;
// import java.net.http.HttpClient;
// import java.net.http.HttpRequest;
// import java.net.http.HttpResponse;

// public class OpenAIRequest {

//     public static void main(String[] args) {
//         String apiKey = "your-api-key";
//         String endpoint = "https://api.openai.com/v1/your-endpoint"; // Replace with the actual API endpoint

//         HttpClient httpClient = HttpClient.newHttpClient();

//         HttpRequest request = HttpRequest.newBuilder()
//                 .uri(URI.create(endpoint))
//                 .header("Content-Type", "application/json")
//                 .header("Authorization", "Bearer " + apiKey)
//                 .POST(HttpRequest.BodyPublishers.noBody())
//                 .build();

//         try {
//             HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
//             System.out.println("Response Code: " + response.statusCode());
//             System.out.println("Response Body: " + response.body());
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }
// }
