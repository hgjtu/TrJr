import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'; 
import { store } from './store/store.tsx';
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> { }
        <App />
      </Provider>
  </StrictMode>,
)
