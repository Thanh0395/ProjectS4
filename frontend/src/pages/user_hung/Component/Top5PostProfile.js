import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "../Custom/Badge.css";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CommentIcon from '@mui/icons-material/Comment';
import FiberNewIcon from '@mui/icons-material/FiberNew';

const Top5PostProfile = ({ posts }) => {

    const navigate = useNavigate();
    const handleGetPageDetail = (item) => {
        console.log("Item:", item.postId);
        navigate(`/products/detail/${item.postId}`, { state: { product: item } });
    };
    const handleClickShowFeedback = () => {
        console.log("click comment badfe");
    }
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        const hours = `0${date.getHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <Card>
            <CardBody>
                {posts && (
                    <div className="scroll dashboard-list-with-thumbs">
                        {posts.map((item, index) => (
                            <div key={index} className="d-flex flex-row mb-2 p-2">
                                <Card
                                    className="d-block position-relative hover-card"
                                    //onClick={() => handleGetPageDetail(item)}
                                >
                                    <img
                                        src={`http://localhost:8080/${item.featureImage}`}
                                        alt=""
                                        className="list-thumbnail border-0"
                                        style={{ width: '100%' }}
                                        onClick={() => handleGetPageDetail(item)}
                                    />
                                    <Badge
                                        className="position-absolute badge-top-right"
                                        pill
                                    >
                                        {item.categoryName}
                                    </Badge>
                                    {item.countFeedback !== 0 && (
                                        <Badge className="position-absolute badge-top-right2" pill onClick={() => handleClickShowFeedback()} >
                                            <CommentIcon /> {item.countFeedback}
                                        </Badge>
                                    )}
                                    {item.setTopPrize && (
                                        <Badge className="position-absolute badge-top-right2" pill>
                                            <CardGiftcardIcon /> {item.prize}
                                        </Badge>
                                    )}
                                    {item.setTopNew && (
                                        <Badge className="position-absolute badge-top-right2" pill>
                                            <FiberNewIcon />
                                        </Badge>
                                    )}

                                </Card>
                                <div className="pl-1 pt-2 pr-0 pb-1" style={{ width: '85%' }}>
                                    <Card
                                        className="hover-card"
                                        onClick={() => handleGetPageDetail(item)}
                                    >
                                        <p className="list-item-heading" style={{ fontSize: 'larger' }}>{item.title}</p>
                                        <div className="pr-1">
                                            <p className="text-muted mb-0 text-small">
                                                <AttachMoneyIcon /> Price :{item.price}
                                            </p>
                                        </div>
                                        <p className="text-muted mb-0 text-small">
                                            Date: {formatDate(item.createdAt)}
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default Top5PostProfile;
