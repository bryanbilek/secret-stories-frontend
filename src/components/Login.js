import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth().post('api/auth/login', user)
        .then(res => {
            dispatch(login(res.data.token));
            navigate('/stories');
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <h3>Login To View Stories</h3>
        <form onSubmit={handleSubmit}>
            <input placeholder='username' name='username' value={user.username} onChange={handleChange} required autoFocus />
            <input placeholder='password' name='password' type='password' value={user.password} onChange={handleChange} required />
            <button type='submit'>Login!</button>
        </form>
        <Link to='/register'><h3>No account? Click here to make a new account!</h3></Link>
    </div>
  )
}

export default Login