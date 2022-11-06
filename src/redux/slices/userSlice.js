import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: JSON.parse(localStorage.getItem('user'))
  },
  reducers: {
    register: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('user');
    }
  }
});

export const { register, login, logout }  = userSlice.actions;
export default userSlice.reducer;
export const userSelector = state => state.user;