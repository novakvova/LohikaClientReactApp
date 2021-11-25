import { Route, Routes } from 'react-router';
import './App.css';
import Home from './comonents/Home';
import Register from './comonents/auth/Register';
import DefaultLayout from './comonents/containers/DefaultLayout';
import AddNewCar from './comonents/AddNewCar';
import LoginPage from './comonents/auth/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/add" element={<AddNewCar />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
