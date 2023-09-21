import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLessonById } from '../../api/lessonApi'

function LessonAdminDetail(props) {
    const [lesson, setLesson] = useState(null);
    const params = useParams();
    useEffect(() => {
        // Fetch the post when the component mounts
        const fetchData = async () => {
            try {
                const postData = await fetchLessonById(params.id); // Replace with your API call
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
                    {/* You can display other post details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default LessonAdminDetail;
