import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLessonById } from '../../services/api/lessonApi';

function LessonAdminDetail(props) {
    const [lesson, setLesson] = useState(null);
    const params = useParams();
    useEffect(() => {
        const lessonId = params.id;
        const fetchData = async () => {
            try {
                const postData = await fetchLessonById(lessonId);
                setLesson(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [params.id]);
    return (
        <div>
            <h2>Post Detail</h2>
            {lesson ? (
                <div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.body}</p>
                    <img src={lesson.imageUrl} alt="Post" style={{ maxWidth: '100%' }} />
                    <p>Price: ${lesson.price}</p>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default LessonAdminDetail;
