import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import Categories from './routes/Categories';
import Category from './routes/Category';
import AgreementForm from './routes/AgreementForm';
import NotFound from './routes/Errors';
import './App.css'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/categories" element={<Categories />}/>
      <Route path="/category/:categoryCode?" element={<Category />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/agreement" element={<AgreementForm />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )   
}

export default App
