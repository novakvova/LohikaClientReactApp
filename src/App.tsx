import { Route, Routes } from 'react-router';
import './App.css';
import Home from './comonents/Home';
import Register from './comonents/auth/Register';
import DefaultLayout from './comonents/containers/DefaultLayout';

function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/register" element={<Register/>} />
      </Route>

    </Routes>
   </>
  );
}

export default App;
