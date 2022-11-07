import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStoryAsync } from '../redux/slices/storySlice';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AddStory = () => {
    const token = localStorage.getItem('user');
    const decode = jwtDecode(token);
    const [story, setStory] = useState({
        title: '',
        body: '',
        author: decode.username
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setStory({...story, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addStoryAsync(story));
        navigate('/stories');
    }

  return (
    <div>
        <h1>Add Story</h1>
        <form onSubmit={handleSubmit}>
            <input placeholder='title' name='title' value={story.title} onChange={handleChange} required autoFocus />
            <input placeholder='body' name='body' value={story.body} onChange={handleChange} required />
            <button type='submit'>Add Story</button>
        </form>
    </div>
  )
}

export default AddStory