import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStoriesAsync, storySelector } from '../redux/slices/storySlice';

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

    if (!stories) return <p>Loading...</p>;

  return (
    <div>
        <h1>Stories</h1>
        <button onClick={handleClick}>+ Add Story</button>
        {stories.map(story => (
            <div key={story._id}>
                <Link to={`${story._id}`} className='story'>
                    <h1>{story.title}</h1>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Stories