import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import styled from 'styled-components';
import './login.css';
import { BeatLoader } from 'react-spinners';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

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
        .catch(err => {
            console.log(err);
            setError(err.request.response);
        })
    }

    if (!user) return <div style={{ textAlign: 'center'}}><BeatLoader color="darkred" /></div>

  return (
    <LoginContainer>
        <h3>Login To Secret Stories</h3>
        <form className='login-form' onSubmit={handleSubmit}>
            <input placeholder='username' name='username' value={user.username} onChange={handleChange} required autoFocus />
            <input placeholder='password' name='password' type='password' value={user.password} onChange={handleChange} required />
            <Button type='submit'>Login</Button>
            {error ? <p style={{ color: 'darkred', textAlign: 'center' }}>{JSON.parse(error)}</p> : ''}
        </form>
        <Link className='register-link' to='/register'><p>No account? Click here to make a new account!</p></Link>
    </LoginContainer>
  )
}

export default Login

//styling
const LoginContainer = styled.div`
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