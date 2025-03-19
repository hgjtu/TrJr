import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './reducers/userReducer';
import { useEffect } from "react";
import LoginForm from './routes/LoginForm';
import RegisterForm from './routes/RegisterForm';
// import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home';
import About from './routes/About';
import Categories from './routes/Categories';
import Category from './routes/Category';
import AgreementForm from './routes/AgreementForm';
import NotFound from './routes/Errors';
import './App.css';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')){
      try{
        // const response = await axios.get<AuthResponse>(`${API_URL}/auth/check`);
        // localStorage.setItem("token", response.data.token);
        dispatch(setAuth(true));
        // dispatch(setUser(response.data.user));
      }
      catch (error){
          console.log(error); //наверное так не стоит делать
      }
    }
  }, [])

  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuth ? <LoginForm /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuth ? <RegisterForm /> : <Navigate to="/" />} />
        
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryCode?" element={isAuth ? <Category /> : <Navigate to="/login" />} />

        <Route path="/about" element={<About />} />
        <Route path="/agreement" element={isAuth ? <AgreementForm /> : <Navigate to="/login" />} />

        <Route path="*" element={<NotFound />} />
        
        
        {/* <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> */}
        {/* <Route
          path="/user"
          element={
            <PrivateRoute roles={['user']}>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <Admin />
            </PrivateRoute>
          }
        /> */}

        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;