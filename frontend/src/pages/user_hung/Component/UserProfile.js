import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileCard from "./ProfileCard";
import { Alert } from "react-bootstrap";
import Top5PostProfile from "./Top5PostProfile";
import ProfileCard2 from "./ProfileCard2";

const UserProfile = ({ user, gem, userLevel, setReRender, recentTop5Posts, top5PostsByFeedbackCount, top5PostsByPrize }) => {

    const [activeTab, setActiveTab] = useState('1');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);  
        }
    };
    const [message, setMessage] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 5000);
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
                            <Col xs="6">
                                {/* <ProfileCard user={user} gem={gem} userLevel={userLevel} /> */}
                                <ProfileCard2 user={user} gem={gem} userLevel={userLevel} />
                                {currentUser.userId === user.userId && (
                                    <ProfileUpdateForm user={user} setReRender={setReRender} setMessage={setMessage} />
                                )}
                            </Col>
                            <Col xs="6">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            active={activeTab === '1'} 
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Top Recent Courses
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            active={activeTab === '2'}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Top Favorite Courses
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            active={activeTab === '3'}
                                            onClick={() => { toggle('3'); }}
                                        >
                                            Top High Prize Courses
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        {activeTab === '1' && (
                                            <Top5PostProfile posts={recentTop5Posts} />
                                        )}
                                    </TabPane>
                                    <TabPane tabId="2">
                                        {activeTab === '2' && (
                                            <Top5PostProfile posts={top5PostsByFeedbackCount} />
                                        )}
                                    </TabPane>
                                    <TabPane tabId="3">
                                        {activeTab === '3' && (
                                            <Top5PostProfile posts={top5PostsByPrize} />
                                        )}
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );

};

export default UserProfile;
