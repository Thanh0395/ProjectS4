import React, { useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Diamond } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
//import "../Custom/ProfileCard.css";

const ProfileCard = ({ user, gem, userLevel, setSelectedUpdateProfile }) => {

    return (
        <div>
            <Card className="mb-4">
                <CardBody>
                    <div style={{ marginLeft: "100px" }}>
                        <Avatar alt={user.userName} src={`http://localhost:8080/${user.avatar}`} sx={{ width: 250, height: 250 }} />
                        <div className="text-center pt-4">
                            <p className="list-item-heading pt-2">{user.userName}</p>
                        </div>
                        <div>
                            <h3>{user.name}</h3>
                            <Typography variant="body1"><Diamond /> Gem: {gem.current}</Typography>
                            <Typography variant="body1"><StarIcon /> Level: {userLevel.level}</Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProfileCard;
