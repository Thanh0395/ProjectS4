import React from 'react';
import logo from '../../logo.svg'
import { Col, Container, Row } from 'react-bootstrap';

function Footer(props) {
    return (
        <footer className="bg-dark text-light py-4 mt-4">
            <Container>
                <Row>
                    <Col md={2} sm={12}>
                        <div className="mb-4">
                            <img
                                src={logo}
                                alt="Logo"
                                className="img-fluid"
                                width={100}
                            />
                        </div>
                    </Col>

                    <Col md={5} sm={6}>
                        <address>
                            Your Company Address<br />
                            City, State, ZIP<br />
                            Phone: (123) 456-7890<br />
                            Email: info@example.com
                        </address>
                    </Col>

                    <Col md={5} sm={6}>
                        <h5>Members:</h5>
                        <ul>
                            <li>Tran Pham Duy Thanh</li>
                            <li>Pham Trung Nhan</li>
                            <li>Nguyen Tan Hung</li>
                            <li>Tran Cao Tien Sy</li>
                            <li>Pham Anh Doan</li>
                            {/* Add more members as needed */}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <div className='text-center'>
                        <span className="small">Group01 ©2023 All Rights Reserved.</span>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;