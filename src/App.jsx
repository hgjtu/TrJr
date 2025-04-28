import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAuth, setUser } from './reducers/userReducer.tsx';
import AuthService from "./services/AuthService.tsx";
import RoleGuard from './components/RoleGuard.tsx';
import Header from './components/Header.tsx';
import LoginForm from './routes/LoginForm.tsx';
import RegisterForm from './routes/RegisterForm.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Home from './routes/Home.tsx';
import About from './routes/About.tsx';
import Profile from './routes/Profile.tsx';
import UserPage from './routes/UserPage.tsx';
import AdminPage from './routes/AdminPage.tsx';
import ModeratorPage from "./routes/ModeratorPage.tsx";
import PostPage from './routes/PostPage.tsx';
import CreatePostPage from './routes/CreatePostPage.tsx';
import NotFound from './routes/Errors.tsx';
import './App.css';
import LoadingSpinner from "./components/LoadingSpinner.tsx";


function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      AuthService.checkSession()
          .then((response) => {
              if (response.status === 200) {
                  console.log(response);
                  dispatch(setAuth(true));
                  dispatch(setUser(response.data));
              }
          })
          .catch(() => dispatch(setAuth(false)), dispatch(setUser(null)))
          .finally(() => setIsLoading(false));
  }, []);
  
  if (isLoading) {
      return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={!isAuth ? <LoginForm /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!isAuth ? <RegisterForm /> : <Navigate to="/profile" />} />
        
        <Route path="/about" element={<About />} />

        <Route path="/posts/:postId?" element={<PostPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePostPage />} />

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

        <Route path="/moderator" element={
            <RoleGuard requiredRoles={['ROLE_ADMIN', 'ROLE_MODERATOR']}>
              <ModeratorPage />
            </RoleGuard>
          } />

        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;