import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, logout } from '../redux/slices/userSlice';
import styled from 'styled-components';
import { FaUserSecret } from 'react-icons/fa';
import { SiStorybook  } from 'react-icons/si';
import './navbar.css'

const NavBar = () => {
  //use token to display register & login links on nav or logout link
  const { token } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <NavB>
      <NavLogos>
      <FaUserSecret />
      <SiStorybook />
      <NavName>Secret Stories</NavName>
      </NavLogos>
      <NavLinkGroup>
      <Link to='/' className='nav-links'>
        Home
      </Link>
      {!token ?
      <Link to='/login' className='nav-links'>
        Stories
      </Link>
      :
      <Link to='/stories' className='nav-links'>
        Stories
      </Link>}
      {token ? 
       (<div>
        <Link
          to='/'
          className='nav-links'
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Link>
      </div>)
      :
    (<div>
      {/* <Link to='/register' className='navlinks'>
        Register
      </NavLink> */}
      <Link to='/login' className='nav-links'>
        Login
      </Link>
        </div>)}
      </NavLinkGroup>
    </NavB>
  );
};

export default NavBar;

//styling
const NavB = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
padding: 2%;
background-color: black;
color: white;
`

const NavLogos = styled.div`
width: 50%;
margin-left: 2%;
display: flex;
justify-content: flex-start;
align-items: center;
`

const NavName = styled.p`
margin-left: 2%;
`

const NavLinkGroup = styled.div`
width: 30%;
display: flex;
justify-content: space-around;
`