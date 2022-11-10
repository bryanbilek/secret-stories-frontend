import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoryAsync, storySelector, deleteStoryAsync, getStory } from '../redux/slices/storySlice';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

const Story = () => {
    const { story } = useSelector(storySelector);
    const { storyId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStoryAsync(storyId));
        return () => dispatch(getStory(null));
    }, [dispatch, storyId])

    const handleDelete = () => {
        dispatch(deleteStoryAsync(storyId));
        navigate('/stories');
    }

    const handleUpdate = () => {
        navigate(`/stories/${storyId}/update-story`);
    }

    if (!story) return <div style={{ textAlign: 'center'}}><BeatLoader color="darkred" /></div>

    //decode the token to get the username property off it to assign as a story's author
    const token = localStorage.getItem('user');
    const decode = jwtDecode(token);

  return (
    <StoryContainer>
        <Title>{story.title}</Title>
        <Author>Author: {story.author}</Author> 
        <Body>{story.body}</Body>
        {/* check if the token's _id is equal to the user_id to determine if they get the options to update or delete their stories    */}
        {decode._id === story.user_id && 
            <div className='button-group'>
                <Button onClick={handleDelete}>Delete</Button> 
                <Button onClick={handleUpdate}>Update</Button>     
        </div>}
    </StoryContainer>
  )
}

export default Story

//styling
const StoryContainer = styled.div`
padding: 5% 0;
display: flex;
flex-direction: column;
align-items: center;
background-color: lightgrey;
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

const Title = styled.h1`
color: darkred;
`

const Author = styled.p`
color: yellow;
`

const Body = styled.h3`
text-align: center;
margin: 0 5%;
`