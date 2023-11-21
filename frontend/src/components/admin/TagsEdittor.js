import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from 'react-bootstrap';
import { fetchCategories } from '../../services/api/lessonApi';

function TagsEdittor({ lessonTags }) {
    const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState(lessonTags);
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allTagsData = await fetchCategories();
                setAllTags(allTagsData);
                console.log('Tags list:', allTagsData);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        fetchData();
    }, []);

    const handleRemoveTag = (index) => {
        const updatedTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        setTags(updatedTags);
    };

    const handleClearAllTags = () => {
        setTags([]);
    };

    const handleTagSelection = (event) => {
        const selected = event.target.value;
        setSelectedTag(selected);
        if (!tags.includes(selected)) {
            const updatedTags = [...tags, selected];
            setTags(updatedTags);
            console.log('Updated tags:', updatedTags);
        }
    };

    return (
        <div className='admin-tag-container'>
            <div className='title'>Tags</div>
            <div className='detail'>
                <Button variant="primary" type="button" onClick={() => handleClearAllTags()}>
                    Clear all tags
                </Button>
            </div>
            <div className='content'>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>
                            {tag}
                            <ClearIcon onClick={() => handleRemoveTag(index)} />
                        </li>
                    ))}
                    <select
                        value={selectedTag}
                        onChange={handleTagSelection}
                        placeholder="Click to see all tags"
                    >
                        <option value='' disabled hidden>
                            Click to see all tags
                        </option>
                        {allTags.map((tag, index) => (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
        </div>
    );
}

export default TagsEdittor;
