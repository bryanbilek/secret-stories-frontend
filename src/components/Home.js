import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeDiv>
      <h1>Welcome to Secret Stories!</h1>
      <p>Have any secret stories you've always wanted to get off your chest?</p>
      <p>Join us by registering and share away...</p>
      <Button onClick={() => navigate('/register')}>Register</Button>
    </HomeDiv>
  )
}

export default Home

//styling
const HomeDiv = styled.div`
text-align: center;
background-color: lightgrey;
padding: 20% 0;
`

const Button = styled.button`
background-color: black;
color: white;
border-radius: 10%;
&:hover {
  color: red;
  cursor: pointer;
  transform: scale(1.2);
}
`