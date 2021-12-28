//Basic imports
import React, { lazy, Suspense, useEffect } from "react";
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
import ProfilePage from "./components/Profile";
import Cart from "./components/Cart/Cart";
import UserDetailPage from "./components/adminPanel/Users/UserPage";
import NoMatch from "./components/NoMatch";
import EditPage from "./components/adminPanel/Users/EditPage";
import CreatePage from "./components/adminPanel/Users/CreatePage";
import CarsListAdmin from "./components/CarsList/CarListAdmin/CarListAdmin";
import CarPage from "./components/CarsList/CarListAdmin/CarPage";
import EditCarPage from "./components/CarsList/CarListAdmin/EditCarPage";
import RecoverPassword from "./components/auth/recoverPassword";
import SendEmail from "./components/auth/recoverPassword/recoverSuccess";
import ResetPassword from "./components/auth/recoverPassword/resetPassword";

// import Categories from "./components/Categories/CategoriesList/Categories";

import AdminPanelLayout from './components/containers/adminPanelLayout';
import UserSearch from './components/adminPanel/Users/UserSearch';
import CropperComponent from "./components/CropperComponent/CropperComponent";
// import CategoriesAdminList from "./components/Categories/CategoriesList/CategoryListAdmin/CategoriesAdminList";

//Import lazyLoading
const Register = lazy(() => import("./components/auth/Register/index"));
const Login = lazy(() => import("./components/auth/Login/index"));


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
          {/* <Route path="/categories/add" element={<Categories />}/> */}
          {/* <Route path="/categories" element={<CategoriesAdminList />} /> */}
          
          

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
                <Login />
              </Suspense>
            }
          />

          {/* RecoverPasswordRoutes */}

          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/recoverPassword/sendEmail" element={<SendEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Profile Routes */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Products Routes */}
          <Route path="/products/add" element={<AddNewCar />} />
          <Route path="/cars" element={<CarsListAdmin />} />
          <Route path="/cars/:id" element={<CarPage />} />
          <Route path="/cars/edit/:id" element={<EditCarPage />} />
          <Route path="cropper" element={<CropperComponent />}/>
          <Route path="*" element={<NoMatch />} />
        </Route>

        {/* AdminPanelRoutes */}
        <Route path="/adminPanel" element={<AdminPanelLayout />}>
          <Route path="/adminPanel/users" element={<UserSearch />} />
          <Route path="/adminPanel/user/:id" element={<UserDetailPage />} />
          <Route path="/adminPanel/users/edit/:id" element={<EditPage />} />
          <Route path="/adminPanel/users/create" element={<CreatePage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
