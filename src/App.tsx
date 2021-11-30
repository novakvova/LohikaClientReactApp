import { Route, Routes } from 'react-router';
import './App.css';
import Home from './comonents/Home';
import Register from './comonents/auth/Register/index';
import DefaultLayout from './comonents/containers/DefaultLayout';
import AddNewCar from './comonents/AddNewCar';
import LoginPage from './comonents/auth/Login';
import ProfilePage from './comonents/Profile';
import "../node_modules/font-awesome/css/font-awesome.css"; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/add" element={<AddNewCar />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
