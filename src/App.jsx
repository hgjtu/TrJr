import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import Categories from './routes/Categories';
import Category from './routes/Category';
import AgreementForm from './routes/AgreementForm';
import NotFound from './routes/Errors';
import User from './routes/User';
import Admin from './routes/Admin';
import './App.css';

const user = {
  name: 'Paimon',
  roles: ['user'],
  rights: ['can_view_categories']
};

export const isAuthenticated = user => !!user;
export const isAllowed = (user, rights) =>
  rights.some(right => user.rights.includes(right));
export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {hasRole(user, ['user']) && <Route path='/user' element={<User />} />}
        {hasRole(user, ['admin']) && <Route path='/admin' element={<Admin />} />}
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