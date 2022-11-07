import { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth().post('api/auth/register', user)
        .then(res => {
            dispatch(register(res.data.token));
            navigate('/stories');    
        })
        .catch(err => console.log(err));
    }

  return (
    <div>
        <h3>Register To View Stories</h3>
        <form onSubmit={handleSubmit}>
            <input placeholder='username' name='username' value={user.username} onChange={handleChange} required autoFocus />
            <input placeholder='password' name='password' type='password' value={user.password} onChange={handleChange} required />
            <button type='submit'>Register!</button>
        </form>
        <Link to='/login'><p>Already have an account? Click here to login!</p></Link>
    </div>
  )
}

export default Register