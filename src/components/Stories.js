import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStoriesAsync, storySelector } from '../redux/slices/storySlice';
import styled from 'styled-components';
import './stories.css';
import { BeatLoader } from 'react-spinners';

const Stories = () => {
    const { stories } = useSelector(storySelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getStoriesAsync());
    }, [dispatch]);

    const handleClick = () => {
        navigate('add-story');
    }

    if (!stories) return <div style={{ textAlign: 'center'}}><BeatLoader color="darkred" /></div>

  return (
    <StoriesContainer>
        <h1>Secret Stories</h1>
        <Button onClick={handleClick}>Add Story +</Button>
        {stories.map(story => (
            <div key={story._id}>
                <Link className='story-link' to={`${story._id}`}>
                    <h1>{story.title}</h1>
                </Link>
            </div>
        ))}
    </StoriesContainer>
  )
}

export default Stories

//styling
const StoriesContainer = styled.div`
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