
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './comonents/Home';
import Register from './comonents/auth/Register/index';
import DefaultLayout from './comonents/containers/DefaultLayout';
import AddNewCar from './comonents/AddNewCar';
import LoginPage from './comonents/auth/Login';
import ProfilePage from './comonents/Profile';
import "../node_modules/font-awesome/css/font-awesome.css"; 
import { useTypedSelector } from './hooks/useTypedSelector';
import Cart from './comonents/Cart/Cart';
import UsersPage from './comonents/Users/UserList/index'
import UserDetailPage from "./comonents/Users/UserPage";
import NoMatch from './comonents/NoMatch';
import EditPage from './comonents/Users/EditPage';
import CreatePage from './comonents/Users/CreatePage';

function App() {
  const {cartIsShow} = useTypedSelector(store => store.cart);
  
  return (
    <>
      {cartIsShow && <Cart />}
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/add" element={<AddNewCar />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/users/edit/:id" element={<EditPage />} />
          <Route path="/users/create" element={<CreatePage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
