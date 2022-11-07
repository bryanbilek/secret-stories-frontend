import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStoryAsync } from '../redux/slices/storySlice';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const UpdateStory = () => {
    const token = localStorage.getItem('user');
    const decode = jwtDecode(token);
    const [story, setStory] = useState({
        title: '',
        body: '',
        author: decode.username
    });

    const dispatch = useDispatch();
    const { storyId } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStory({...story, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStoryAsync(story, storyId));
        navigate(`/stories`);
    }

  return (
    <div>
        <h1>Update Story</h1>
        <form onSubmit={handleSubmit}>
            <input placeholder='title' name='title' value={story.title} onChange={handleChange} required />
            <input placeholder='body' name='body' value={story.body} onChange={handleChange} required />
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default UpdateStory