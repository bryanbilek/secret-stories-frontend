import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Stories from './components/Stories';
import Story from './components/Story';
import AddStory from './components/AddStory';
import UpdateStory from './components/UpdateStory';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import PrivateRoutes from './utils/PrivateRoutes';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/stories'>
            <Route index element={<Stories />} />
            <Route path='add-story' element={<AddStory />} />
            <Route path=':storyId' element={<Story />} />
            <Route path=':storyId/update-story' element={<UpdateStory />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
