//Basic imports
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";

//ImportModules
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.css";

//Import components
import Home from "./components/Home";
import DefaultLayout from "./components/containers/DefaultLayout";
import AddNewCar from "./components/CarsList/AddNewCar";
import ProfilePage from "./components/Profile";
import Cart from "./components/Cart/Cart";
import NoMatch from "./components/NoMatch";
import CarsListAdmin from "./components/CarsList/CarListAdmin/CarListAdmin";
import CarPage from "./components/CarsList/CarListAdmin/CarPage";
import EditCarPage from "./components/CarsList/CarListAdmin/EditCarPage";
import RecoverPassword from "./components/auth/recoverPassword";
import SendEmail from "./components/auth/recoverPassword/recoverSuccess";
import ResetPassword from "./components/auth/recoverPassword/resetPassword";

import CategoryPage from "./components/Categories/CategoryPage/CategoryPage";
import AdminPanelLayout from "./components/containers/adminPanelLayout";
import UserInfo from "./components/adminPanel/Users/UserInfo";
import EditUser from "./components/adminPanel/Users/UserEdit";
import AdminMain from "./components/adminPanel/Users";
import CreatePage from "./components/adminPanel/Users/CreatePage";
import CategoryDetailPage from "./components/Categories/CategoryPage/CategoryPage";
import EditCategoryPage from "./components/Categories/EditCategoryPage/EditCategoryPage";
import CreateCategory from "./components/Categories/CreateCategory/CreateCategory";

import Categories from "./components/Categories/CategoriesList/Categories";

import TinyEditor from "./components/adminPanel/News/AddNews";
import NewsInfo from './components/adminPanel/News/NewsInfo';

//Import lazyLoading
const Register = lazy(() => import("./components/auth/Register/index"));
const Login = lazy(() => import("./components/auth/Login/index"));

function App() {
  const { cartIsShow } = useTypedSelector((store) => store.cart);
  const {
    isAuth,
    user: { roles },
  } = useTypedSelector((store) => store.auth);

  const { downloadCartData } = useActions();
  useEffect(() => {
    isAuth && downloadCartData();
  }, [downloadCartData, isAuth]);

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
          <Route path="*" element={<NoMatch />} />

          <Route path="/news/:slug" element={<NewsInfo />}></Route>
        </Route>

        {/* AdminPanelRoutes */}

        {isAuth && roles === "admin" && (
          <Route path="/adminPanel" element={<AdminPanelLayout />}>
            <Route path="/adminPanel/users/create" element={<CreatePage />} />
            <Route path="/adminPanel/users" element={<AdminMain />} />
            <Route
              path="/adminPanel/users/userInfo/:id"
              element={<UserInfo />}
            />
            <Route path="/adminPanel/users/edit/:id" element={<EditUser />} />
            <Route path="/adminPanel/editor/add" element={<TinyEditor />} />

            <Route path="/adminPanel/categories" element={<Categories />} />
            <Route
              path="/adminPanel/categories/categoryInfo/:id"
              element={<CategoryDetailPage />}
            />
            <Route
              path="/adminPanel/categories/edit/:id"
              element={<EditCategoryPage />}
            />
            <Route
              path="/adminPanel/categories/add"
              element={<CreateCategory />}
            />
            <Route
              path="/adminPanel/categories/get/:id"
              element={<CategoryPage />}
            />

            <Route path="*" element={<NoMatch />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
