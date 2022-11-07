import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    let authorized = localStorage.getItem('user');

    return (
        authorized ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoutes