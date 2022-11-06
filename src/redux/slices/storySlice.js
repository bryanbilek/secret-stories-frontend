import { createSlice } from '@reduxjs/toolkit';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    stories: [],
    story: null,
    loading: false,
    error: false
  },
  reducers: {
    getStories: (state, action) => {
        state.stories = action.payload;
    },
    getStory: (state, action) => {
        state.story = action.payload;
    },
    addStory: (state, action) => {
        state.stories.push(action.payload);
    },
    updateStory: (state, action) => {
        state.stories.map(story => story._id === action.payload._id ? action.payload : story);
    },
    deleteStory: (state, action) => {
        state.stories.filter(story => story._id !== action.payload);
    },
    setLoading: state => {
        state.loading = true;
    },
    setError: (state, action) => {
        state.error = action.payload;
    }
  }
});

export const { getStories, getStory, addStory, updateStory, deleteStory, setLoading, setError } = storySlice.actions;
export default storySlice.reducer;
export const storySelector = state => state.stories;

export const getStoriesAsync = () => async (dispatch) => {
    try {
        const response = await axiosWithAuth().get('api/stories');
        dispatch(getStories(response.data));
    } catch (error) {
        dispatch(setError(error));
    }
};

export const getStoryAsync = (storyId) => async (dispatch) => {
    try {
        const response = await axiosWithAuth().get(`api/stories/${storyId}`);
        dispatch(getStory(response.data));
    } catch (error) {
        dispatch(setError(error));
    }
};

export const addStoryAsync = (newStory) => async (dispatch) => {
    try {
        const response = await axiosWithAuth().post('api/stories', newStory);
        dispatch(addStory(response.data));
    } catch (error) {
        dispatch(setError(error));
    }
};

export const updateStoryAsync = (updatedStory, storyId) => async (dispatch) => {
    try {
        const response = await axiosWithAuth().put(`api/stories/${storyId}`, updatedStory);
        dispatch(updateStory(response.data));
    } catch (error) {
        dispatch(setError(error));
    }
};

export const deleteStoryAsync = (storyId) => async (dispatch) => {
    try {
        const response = await axiosWithAuth().delete(`api/stories/${storyId}`);
        dispatch(deleteStory(response.data));
    } catch (error) {
        dispatch(setError(error));
    }
};