import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, Col, Badge } from 'reactstrap';
import { Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import { Typography, LinearProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ProgressBar from 'react-bootstrap/ProgressBar';

const BlogAchievementProfile = ({ achievements, setReRender }) => {

    const handleSetImageIcon = (badge, receivedBadge) => {
        if (receivedBadge) {
            localStorage.setItem("imageIcon", badge);
            setMessage("Set image icon successfully");
            setReRender(true);
        } else {
            setMessage("Please try to get this image icon!");
        }
    };
    const [message, setMessage] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [message]);

    const getIconByTitle = (title) => {
        switch (title) {
            case 'Fresher':
                return <StarIcon />;
            case 'Junior':
                return <WorkIcon />;
            case 'Senior':
                return <BusinessCenterIcon />;
            case 'Farmer Bronze':
                return <MonetizationOnIcon />;
            case 'Farmer Silver':
                return <EmojiObjectsIcon />;
            case 'Spendthrift Bronze':
                return <AccountBalanceWalletIcon />;
            case 'Spendthrift Silver':
                return <AccountBalanceWalletIcon />;
            case 'Farmer Gold':
                return <EmojiObjectsIcon />;
            // Add cases for other titles as needed
            default:
                return null; // Return a default icon or null if no match found
        }
    };

    return (
        <Row>
            {message && (
                <Alert variant={message.includes('successfully') ? 'success' : 'danger'} onClose={() => setMessage('')} dismissible className="text-center">
                    {message}
                </Alert>
            )}
            {achievements.map((achievement, index) => (
                <Col xs="12" lg="3" className="mb-3 pt-0" key={`blogItem_${index}`}>
                    <Card>
                        <Row>
                            <Col xs="5">
                                <div style={{margin:"5px"}}>
                                    <div>
                                        <img
                                            className="card-img-left"
                                            src={`http://localhost:8080/${achievement.badge}`}
                                            alt=""
                                            style={{ width: '200px', height: '200px', borderRadius: "25%" }} // Set image width to 100% and maintain aspect ratio
                                        />
                                        {achievement.receivedBadge ? (
                                            <Badge
                                                className="position-absolute badge-top-left"
                                                pill
                                                style={{ backgroundColor: 'grren', color: 'white' }}
                                            >
                                                DONE
                                            </Badge>
                                        ) : (
                                            <Badge
                                                className="position-absolute badge-top-left2"
                                                pill
                                                style={{ backgroundColor: 'grren', color: 'white' }}
                                            >
                                                TRY
                                            </Badge>
                                        )}

                                    </div>
                                </div>
                            </Col>
                            <Col xs="7">
                                <CardBody>
                                    <Typography variant="h6" gutterBottom>
                                        {getIconByTitle(achievement.title)} {achievement.title}
                                    </Typography>
                                    <Typography variant="body1">Score: {achievement.score}</Typography>
                                    <Typography variant="body1">
                                        Process: {achievement.process}%
                                    </Typography>
                                    {achievement.receivedBadge ? (
                                        <ProgressBar variant="success" now={achievement.process} label={`${achievement.process}%`} />
                                    ) : (
                                        <ProgressBar variant="danger" now={achievement.process} label={`${achievement.process}%`} />
                                    )}
                                    <Typography variant="body1">
                                        Received Badge: {achievement.receivedBadge ? 'Done' : 'Incomplete'}
                                    </Typography>
                                    <Button
                                        type="button"
                                        color="primary"
                                        onClick={() => handleSetImageIcon(achievement.badge, achievement.receivedBadge)}
                                    >
                                        Set Image Icon
                                    </Button>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default BlogAchievementProfile;
