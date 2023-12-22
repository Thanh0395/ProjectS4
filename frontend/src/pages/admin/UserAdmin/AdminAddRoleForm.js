import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { FormGroup, Button } from "react-bootstrap";
import * as Yup from 'yup';
import "./CheckBox.css"
import { AdminAddRole, AdminAddUserAPI } from "../../../services/api/AuthApi";
import { Alert } from "react-bootstrap";

const AdminAddRoleForm = ({ setOpenModal, setIsLoad, setMessage, emailAddRole }) => {

    const [messageForm, setMessageForm] = useState('');
    const validationSchema = Yup.object().shape({
        listNameRole: Yup.array()
            .min(1, "Please select at least one role")
            .required("Please select at least one role"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            values.email = emailAddRole == null ? "" : emailAddRole;
            console.log("Update user response:", values);
            AdminAddRole(values);
            setOpenModal(false);
            setIsLoad(true);
            setMessage('Add Role successfully');
        } catch (error) {
            const errorObj = error.response.data;
            setMessageForm(errorObj['Error Message']);
        }
    };


    return (
        <div>
            {messageForm && (
                <Alert variant={messageForm.includes('successfully') ? 'success' : 'danger'} onClose={() => setMessageForm('')} dismissible className="text-center">
                    {messageForm}
                </Alert>
            )}
            <Formik
                initialValues={{
                    listNameRole: []
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({
                    handleSubmit,
                    isSubmitting,
                    values,
                    setFieldValue,
                    errors,
                    touched,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div id="checkbox-group">Choose Roles</div>
                        <div role="group" aria-labelledby="checkbox-group">
                            <label>
                                <Field type="checkbox" name="listNameRole" value="ADMIN" />
                                ADMIN
                            </label>
                            <label>
                                <Field type="checkbox" name="listNameRole" value="TEACHER" />
                                TEACHER
                            </label>
                            <label>
                                <Field type="checkbox" name="listNameRole" value="USER" />
                                USER
                            </label>
                        </div>
                        {errors.listNameRole && touched.listNameRole && <div style={{ color: 'red' }} className="error">{errors.listNameRole}</div>}
                        <div style={{ margin: '10px' }}>
                            <Button variant="secondary" style={{ marginRight: '10px' }} onClick={() => setOpenModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminAddRoleForm;
