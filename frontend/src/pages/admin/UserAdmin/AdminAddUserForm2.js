import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { FormGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import "./CheckBox.css"
import { AdminAddUserAPI } from "../../../services/api/AuthApi";
import { Alert } from "react-bootstrap";

const AdminAddUserForm2 = ({ setOpenModal, setIsLoad, setMessage }) => {

  const [messageForm, setMessageForm] = useState('');
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Field is required"),
    email: Yup.string().email().required(),
    password: Yup.string().min(3, "Please, at least 3 character!...").required(),
    dateOfBirth: Yup
      .date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .required('Date field is required'),
    listNameRole: Yup.array()
      .min(1, "Please select at least one role") // Ensures at least one role is selected
      .required("Please select at least one role"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try { 
      values.isActive = values.isActive ? "true" : "false";
      const createUserResponse = await AdminAddUserAPI(values);
      console.log("Update user response:", createUserResponse);
      setOpenModal(false);
      setIsLoad(true);
      setMessage('Create User successfully');
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
          name: '',
          dateOfBirth: '',
          email: 'exampleEmail@gmail.com',
          password: '',
          isActive: false,
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
            <FormGroup>
              <label style={{fontWeight:'bold'}}>Full Name</label>
              <Field type="text" name="name" className="form-control" />
              {errors.name && touched.name && <div style={{ color: 'red' }} className="error">{errors.name}</div>}
            </FormGroup>
            <FormGroup>
              <label style={{fontWeight:'bold'}}>Email Address</label>
              <Field type="email" name="email" className="form-control" />
              {errors.email && touched.email && <div style={{ color: 'red' }} className="error">{errors.email}</div>}
            </FormGroup>
            <FormGroup>
              <label style={{fontWeight:'bold'}}>Password</label>
              <Field type="password" name="password" className="form-control" />
              {errors.password && touched.password && <div style={{ color: 'red' }} className="error">{errors.password}</div>}
            </FormGroup>
            <FormGroup>
              <label style={{fontWeight:'bold'}}>Date of Birth</label>
              <br />
              <DatePicker
                selected={values.dateOfBirth}
                onChange={(date) => setFieldValue("dateOfBirth", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
              {errors.dateOfBirth && touched.dateOfBirth && <div style={{ color: 'red' }} className="error">{errors.dateOfBirth}</div>}
            </FormGroup>
            <FormGroup>
              <label style={{fontWeight:'bold'}}>
                IsActive
              </label>
              <Field type="checkbox" style={{margin: "10px"}} className="checkbox-is-active" name="isActive" />
            </FormGroup>
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

export default AdminAddUserForm2;
