import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from 'react-bootstrap';
import { addTag, fetchTags, removeAllTag, removeTag } from '../../services/api/lessonApi';

function TagsEditor({ lessonTags, postId, updateTag }) {
    const myId = postId;
    const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState(lessonTags);
    const [resetTag, setResetTag] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allTagsData = await fetchTags();
                setAllTags(allTagsData);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        fetchData();
    }, []);

    const handleRemoveTag = (tagId) => {
        removeTag(myId,tagId);
        const updatedTags = tags.filter(tag => tag.tagId !== tagId);
        updateTag(updatedTags);
        setTags(updatedTags);
    };

    const handleClearAllTags = () => {
        updateTag([]);
        removeAllTag(myId);
        setTags([]);
    };

    const handleTagSelection = (event) => {
        const selectedId = Number(event.target.value);
        const aTag = allTags.find(tag => tag.tagId === selectedId);
        if (!tags.some(tag => tag.tagId === selectedId)) {
            const updatedTags = [...tags, aTag];
            setTags(updatedTags);
            updateTag(updatedTags);
            addTag(myId,selectedId);
        }
        setResetTag('');
    };

    return (
        <div className='admin-tag-container'>
            <div className='row'>
                <div className='col-md-2' style={{ fontWeight: 'bold' }}>
                    Tags
                </div>
                <div className='col-md-5' >
                    <select
                        value={resetTag}
                        onChange={handleTagSelection}
                        placeholder="Click to add a tag"
                        className="form-select col-md-4"
                    >
                        <option value='' disabled>
                            Click to add a tag
                        </option>
                        {allTags.map((tag, index) => (
                            <option key={index} value={tag.tagId}>
                                {tag.tagName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-md-5'>
                    <Button className='col-md-4' variant="danger" type="button" onClick={() => handleClearAllTags()}>
                        Clear all
                    </Button>
                </div>
            </div>

            <div className='post-tag-container'>
                <ul className='post-tag-list'>
                    {tags.length > 0 ?
                        tags.map((tag, index) => (
                            <li key={index} className='post-tag-list-item'>
                                {tag.tagName}
                                <ClearIcon fontSize='small' color='error' onClick={() => handleRemoveTag(tag.tagId)} className='post-tag-icon' />
                            </li>
                        ))
                        : <p>No tag yet!</p>
                    }
                </ul>
            </div>
        </div>
    );
}

export default TagsEditor;
