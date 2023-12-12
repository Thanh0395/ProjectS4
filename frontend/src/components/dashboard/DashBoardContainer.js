import React, { useEffect, useState } from 'react';
import { Card, Row, ProgressBar } from 'react-bootstrap';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Article, People, Class, LocalOffer } from '@mui/icons-material';
import './dashboard.css';
import { fetchAllUser } from '../../services/api/userAPI';
import { fetchListLessonDashboard } from '../../services/api/lessonApi';
import { fetchListCategory } from '../../services/api/categoryApi';
import { fetchListTag } from '../../services/api/tagApi';

function DashBoardContainer(props) {
    const [fetched, setFetched] = useState(false);
    const [users, setUsers] = useState();
    const [lessons, setLessons] = useState();
    const [categories, setCategories] = useState();
    const [tags, setTags] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const userList = await fetchAllUser();
            setUsers(userList);
            const lessonList = await fetchListLessonDashboard();
            setLessons(lessonList);
            const categoryList = await fetchListCategory();
            setCategories(categoryList.data);
            const tagList = await fetchListTag();
            setTags(tagList.data);
        }
        setFetched(true);
        fetchData();
    }, []);
    return (
        <div className='dashbooard-container container'>
            {!fetched && <ProgressBar animated now={90} />}
            <Row className='d-flex justify-content-around'>
                {users &&
                    <Card
                        style={{ width: '12rem' }}
                        className="thanh-dashboard-card mb-2"
                    >
                        <Card.Header>
                            <ListItemIcon>
                                <People color='success' />
                            </ListItemIcon>
                            User
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{users.length} Users</Card.Title>
                        </Card.Body>
                    </Card>
                }
                {lessons &&
                    <Card
                        style={{ width: '12rem' }}
                        className="thanh-dashboard-card mb-2"
                    >
                        <Card.Header>
                            <ListItemIcon>
                                <Article color='warning' />
                            </ListItemIcon>
                            Course
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{lessons.length} Courses</Card.Title>
                        </Card.Body>
                    </Card>
                }
                {categories &&
                    <Card
                        style={{ width: '12rem' }}
                        className="thanh-dashboard-card mb-2"
                    >
                        <Card.Header>
                            <ListItemIcon>
                                <Class color='primary' />
                            </ListItemIcon>
                            Category
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{categories.length} Categories</Card.Title>
                        </Card.Body>
                    </Card>
                }
                {tags &&
                    <Card
                        style={{ width: '12rem' }}
                        className="thanh-dashboard-card mb-2"
                    >
                        <Card.Header>
                            <ListItemIcon>
                                <LocalOffer color='secondary' />
                            </ListItemIcon>
                            Tag
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{tags.length} Tags</Card.Title>
                        </Card.Body>
                    </Card>
                }
            </Row>
            <Row>
                
            </Row>

        </div>
    );
}

export default DashBoardContainer;