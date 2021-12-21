import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/auth/Register/index";
import DefaultLayout from "./components/containers/DefaultLayout";
import AddNewCar from "./components/AddNewCar";
import LoginPage from "./components/auth/Login";
import ProfilePage from "./components/Profile";
import "../node_modules/font-awesome/css/font-awesome.css";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Cart from "./components/Cart/Cart";
import UserDetailPage from "./components/Users/UserPage";
import NoMatch from "./components/NoMatch";
import EditPage from "./components/Users/EditPage";
import { useActions } from "./hooks/useActions";
import { useEffect } from "react";
import CreatePage from "./components/Users/CreatePage";
import UserSearch from "./components/Users/UserSearch";

import CarsListAdmin from "./components/CarsList/CarListAdmin/CarListAdmin";
import CarPage from "./components/CarsList/CarListAdmin/CarPage";
import EditCarPage from "./components/CarsList/CarListAdmin/EditCarPage";

import RecoverPassword from "./components/auth/recoverPassword";
import SendEmail from "./components/auth/recoverPassword/recoverSuccess";
import ResetPassword from "./components/auth/recoverPassword/resetPassword";

function App() {
  const { cartIsShow } = useTypedSelector((store) => store.cart);

  const { downloadCartData } = useActions();
  useEffect(() => {
    downloadCartData();
  }, []);

  return (
    <>
      {cartIsShow && <Cart />}
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/add" element={<AddNewCar />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/recoverPassword/sendEmail" element={<SendEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UserSearch />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/users/edit/:id" element={<EditPage />} />
          <Route path="/users/create" element={<CreatePage />} />
          <Route path="/cars" element={<CarsListAdmin />} />
          <Route path="/cars/:id" element={<CarPage />} />
          <Route path="/cars/edit/:id" element={<EditCarPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
