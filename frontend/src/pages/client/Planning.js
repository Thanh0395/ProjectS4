import React, { useState } from 'react';
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import OpenAI from 'openai';
import environment from '../../environment.json';

function Planning(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

    const openAi = new OpenAI({ apiKey: environment.apikey.chatGPT, dangerouslyAllowBrowser: true });

    const { Formik } = formik;
    const schema = yup.object().shape({
        ask: yup.string().required("Type anything"),
    });
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setIsLoading(true);
            const message = values.ask;
            console.log('My message: ', message);
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
                max_tokens: 256,
            });
            setQuestion(message);
            setAnswer(response.choices[0].text);
            resetForm();
            console.log('Answer: ', response.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    return (
        <>
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
                                    <Form.Label>Your message</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={4}
                                        type="text"
                                        name="ask"
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
                            {question && (
                                <Row className="mt-3">
                                    <Col>
                                        <strong>{question}</strong>
                                    </Col>
                                </Row>
                            )}
                            {answer && (
                                <Row className="mt-3">
                                    <Col>
                                        <strong>Answer: </strong>
                                        <p>{answer}</p>
                                    </Col>
                                </Row>
                            )}
                        </Form>
                    )}
                </Formik>
            </Col>
        </>
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
