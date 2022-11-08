import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStoryAsync } from '../redux/slices/storySlice';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styled from 'styled-components';
import './updatestory.css';

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
    <UpdateStoryContainer>
        <h1>Update Story</h1>
        <form className='update-form' onSubmit={handleSubmit}>
            <input placeholder='title' name='title' value={story.title} onChange={handleChange} required />
            <input placeholder='body' name='body' value={story.body} onChange={handleChange} required />
            <Button type='submit'>Update</Button>
        </form>
    </UpdateStoryContainer>
  )
}

export default UpdateStory

//styling
const UpdateStoryContainer = styled.div`
padding: 5% 0;
display: flex;
flex-direction: column;
align-items: center;
background-color: grey;
`

const Button = styled.button`
background-color: black;
color: white;
border-radius: 5%;
&:hover {
  color: darkred;
  cursor: pointer;
  transform: scale(1.1);
}
`