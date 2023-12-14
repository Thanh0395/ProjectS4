import React, { useState, useEffect } from "react";
import { Avatar, Container, Grid, TextField, Typography } from "@mui/material";
import { Diamond } from "@mui/icons-material";
import StarsIcon from '@mui/icons-material/Stars';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProfileDataByUserId, UpdateUserAPI, UploadImageAPI } from "../../../services/api/AuthApi";
import { Row, Col } from "reactstrap";
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileCard from "./ProfileCard";
import { FormGroup, Label, Card, Button } from "reactstrap";
import { Alert } from "react-bootstrap";

const UserProfile = ({ user, gem, userLevel, setReRender }) => {

    const [file, setFile] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div style={{ marginTop: 0 }}>
            <Container maxWidth="lg">
                {message && (
                    <Alert variant={message.includes('successfully') ? 'success' : 'danger'} onClose={() => setMessage('')} dismissible className="text-center">
                        {message}
                    </Alert>
                )}
                {user && (
                    <>
                        <Row>
                            <Col xs="4">
                                <ProfileCard user={user} gem={gem} userLevel={userLevel} />
                            </Col>
                        </Row>
                        <Row>
                            <ProfileUpdateForm user={user} setReRender={setReRender} setMessage={setMessage} />
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );

};

export default UserProfile;
