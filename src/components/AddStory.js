import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStoryAsync } from '../redux/slices/storySlice';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styled from 'styled-components';
import './addstory.css';

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
    <AddStoryContainer>
        <h1>Add Story</h1>
        <form className='add-form' onSubmit={handleSubmit}>
            <input placeholder='title' name='title' value={story.title} onChange={handleChange} required autoFocus />
            <input placeholder='body' name='body' value={story.body} onChange={handleChange} required />
            <Button type='submit'>Add Story +</Button>
        </form>
    </AddStoryContainer>
  )
}

export default AddStory

//styling
const AddStoryContainer = styled.div`
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