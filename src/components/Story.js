import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoryAsync, storySelector, deleteStoryAsync, getStory } from '../redux/slices/storySlice';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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

    if (!story) return <p>Loading...</p>;

    //decode the token to get the username property off it to assign as a story's author
    const token = localStorage.getItem('user');
    const decode = jwtDecode(token);

  return (
    <div>
        <h1>{story.title}</h1>
        <h2>{story.body}</h2>
        <p>Author: {story.author}</p> 
        {/* check if the token's _id is equal to the user_id to determine if they get the options to update or delete their stories    */}
        {decode._id === story.user_id && 
            <div className='button-group'>
                <button onClick={handleDelete}>Delete</button> 
                <button onClick={handleUpdate}>Update</button>     
        </div>}
    </div>
  )
}

export default Story