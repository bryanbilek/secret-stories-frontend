import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, logout } from '../redux/slices/userSlice';

const NavBar = () => {
  //use token to display register & login links on nav or logout link
  const { token } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <NavLink to='/' className='navlinks'>
        Home
      </NavLink>
      {!token ?
      <NavLink to='/login' className='navlinks'>
        Stories
      </NavLink>
      :
      <NavLink to='/stories' className='navlinks'>
        Stories
      </NavLink>}
      {token ? 
       (<div>
        <NavLink
          to='/'
          className='navlinks'
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </NavLink>
      </div>)
      :
    (<div>
      <NavLink to='/register' className='navlinks'>
        Register
      </NavLink>
      <NavLink to='/login' className='navlinks'>
        Login
      </NavLink>
        </div>)}
    </div>
  );
};

export default NavBar;