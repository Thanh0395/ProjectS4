import React from 'react';
import { Row, Card, CardBody, Col } from 'reactstrap';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { Typography, LinearProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ProgressBar from 'react-bootstrap/ProgressBar';

const BlogAchievementProfile = ({ achievements }) => {

    const handleSetImageIcon = (badge) => {
        localStorage.setItem("imageIcon", badge);
        window.location.reload();
    };

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
            {achievements.map((achievement, index) => (
                <Col xxs="12" lg="4" className="mb-5" key={`blogItem_${index}`}>
                    <Card>
                        <div>
                            <div style={{ position: 'relative', display: 'flex' }}>
                                <img
                                    className="card-img-left"
                                    src="/ImageHung/blog_achie01.jpg"
                                    alt=""
                                    style={{ width: '200px', height: '200px' }} // Set image width to 100% and maintain aspect ratio
                                />
                                {achievement.receivedBadge ? (
                                    <Button disabled style={{ backgroundColor: 'green', color: 'white' }}>
                                        Done
                                    </Button>
                                ) : (
                                    <Button disabled style={{ backgroundColor: 'brown', color: 'white' }}>
                                        Try
                                    </Button>
                                )}
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
                                        onClick={() => handleSetImageIcon(achievement.badge)}
                                    >
                                        Set Image Icon
                                    </Button>
                                </CardBody>
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default BlogAchievementProfile;
