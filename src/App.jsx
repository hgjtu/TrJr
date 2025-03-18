import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginForm from './routes/LoginForm';
// import RegisterForm from './routes/RegisterForm';
// import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home';
import About from './routes/About';
import Categories from './routes/Categories';
import Category from './routes/Category';
import AgreementForm from './routes/AgreementForm';
import NotFound from './routes/Errors';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryCode?" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/agreement" element={<AgreementForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;