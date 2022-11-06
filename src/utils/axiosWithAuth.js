import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('user');
    return axios.create({
        baseURL: 'https://secret-stories.onrender.com/',        
        headers: {
            authorization : JSON.parse(token)
        }       
    });
};