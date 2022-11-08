import { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import './register.css';
import { BeatLoader } from 'react-spinners';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    
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
        .catch(err => {
            console.log(err.request.response);
            setError(err.request.response);

        })
    }

    if (!user) return <div style={{ textAlign: 'center'}}><BeatLoader color="darkred" /></div>

  return (
    <RegisterContainer>
        <h3>Register To Secret Stories</h3>
        <form className='reg-form' onSubmit={handleSubmit}>
            <input placeholder='username' name='username' value={user.username} onChange={handleChange} autoFocus />
            <input placeholder='password' name='password' type='password' value={user.password} onChange={handleChange} />
            <Button type='submit'>Register</Button>
            {error ? <p style={{ color: 'darkred', textAlign: 'center' }}>{JSON.parse(error)}</p> : ''}
        </form>
        <Link to='/login' className='login-link'><p>Already have an account? Click here to login!</p></Link>
    </RegisterContainer>
  )
}

export default Register

//styling
const RegisterContainer = styled.div`
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