import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import RoleGuard from './components/RoleGuard';
import Header from './components/Header';
import LoginForm from './routes/LoginForm';
import RegisterForm from './routes/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home';
import About from './routes/About';
import Categories from './routes/Categories';
import Category from './routes/Category';
import Profile from './routes/Profile';
import UserPage from './routes/UserPage';
import AdminPage from './routes/AdminPage';
import NotFound from './routes/Errors';
import './App.css';


function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={!isAuth ? <LoginForm /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuth ? <RegisterForm /> : <Navigate to="/" />} />
        
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:categoryCode?" element={<Category />} />

          <Route path="/user" element={
            <RoleGuard requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <UserPage />
            </RoleGuard>
          } />
          
          <Route path="/admin" element={
            <RoleGuard requiredRoles={['ROLE_ADMIN']}>
              <AdminPage />
            </RoleGuard>
          } />
        </Route>

        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;