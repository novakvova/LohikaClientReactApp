//Basic imports
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";

//ImportModules
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.css";

//Impor components
import Home from "./components/Home";
import DefaultLayout from "./components/containers/DefaultLayout";
import AddNewCar from "./components/AddNewCar";
import LoginPage from "./components/auth/Login";
import ProfilePage from "./components/Profile";
import Cart from "./components/Cart/Cart";
import UserDetailPage from "./components/Users/UserPage";
import NoMatch from "./components/NoMatch";
import EditPage from "./components/Users/EditPage";
import CreatePage from "./components/Users/CreatePage";
import UserSearch from "./components/Users/UserSearch";
import CarsListAdmin from "./components/CarsList/CarListAdmin/CarListAdmin";
import CarPage from "./components/CarsList/CarListAdmin/CarPage";
import EditCarPage from "./components/CarsList/CarListAdmin/EditCarPage";
import RecoverPassword from "./components/auth/recoverPassword";
import SendEmail from "./components/auth/recoverPassword/recoverSuccess";
import ResetPassword from "./components/auth/recoverPassword/resetPassword";
//Import lazyLoading
const Register = React.lazy(() => import("./components/auth/Register/index"));

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
          {/* AuthRoutes */}
          <Route
            path="/register"
            element={
              <Suspense fallback={null}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={null}>
                <LoginPage />
              </Suspense>
            }
          />

          {/* RcoverPasswordRoutes */}
          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/recoverPassword/sendEmail" element={<SendEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* UserCrud Routes */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UserSearch />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/users/edit/:id" element={<EditPage />} />
          <Route path="/users/create" element={<CreatePage />} />

          {/* Products Routes */}
          <Route path="/products/add" element={<AddNewCar />} />
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
