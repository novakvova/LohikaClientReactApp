//Basic imports
import { lazy, Suspense, useEffect } from "react";
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
import CarPage from "./components/CarsList/CarListAdmin/CarPage";
import EditCarPage from "./components/CarsList/CarListAdmin/EditCarPage";
import RecoverPassword from "./components/auth/recoverPassword";
import SendEmail from "./components/auth/recoverPassword/recoverSuccess";
import ResetPassword from "./components/auth/recoverPassword/resetPassword";


//Import lazyLoading
const CarsListAdmin = lazy(() => import("./components/CarsList/CarListAdmin/CarListAdmin"));
const Register = lazy(() => import("./components/auth/Register/index"));
const Login = lazy(() => import("./components/auth/Login/index"));
const AdminMain = lazy(() => import( "./components/adminPanel/Users"));
const CreatePage = lazy(() => import( "./components/adminPanel/Users/CreatePage"));
const AdminPanelLayout = lazy(() => import("./components/containers/adminPanelLayout"));
const UserInfo = lazy(() => import("./components/adminPanel/Users/UserInfo"));
const EditUser = lazy(() => import("./components/adminPanel/Users/UserEdit"));
const NewsAdminList = lazy(() => import("./components/adminPanel/News/NewsListCRUD"));
const EditNews = lazy(() => import("./components/adminPanel/News/EditNews"));
const AddNews = lazy(() => import("./components/adminPanel/News/AddNews"));
const NewsInfo = lazy(() => import("./components/adminPanel/News/NewsInfo"));
const CategoryPage = lazy(() => import("./components/Categories/CategoryPage/CategoryPage"));
const CategoryDetailPage = lazy(() => import("./components/Categories/CategoryPage/CategoryPage"));
const EditCategoryPage = lazy(() => import("./components/Categories/EditCategoryPage/EditCategoryPage"));
const CreateCategory = lazy(() => import("./components/Categories/CreateCategory/CreateCategory"));
const Categories = lazy(() => import("./components/Categories/CategoriesList/Categories"));
const NewsWithNewsList =lazy(() => import("./components/adminPanel/NewsWithNewsLIst"));
const CheckOut = lazy(() => import("./components/Checkout/index"))


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
          <Route path="/cars" element={<Suspense fallback={null}><CarsListAdmin /></Suspense>} />
          <Route path="/cars/:id" element={<CarPage />} />
          <Route path="/cars/edit/:id" element={<EditCarPage />} />

          {/* News Routes*/}
          <Route path="/news/:slug" element={<Suspense fallback={null}><NewsWithNewsList /></Suspense>}></Route>

          {/*Checkout Route*/}
          <Route path="/ckeckOut" element={<Suspense fallback={null}><CheckOut /></Suspense>}/>
          <Route path="*" element={<NoMatch />} />
        </Route>

        {/* AdminPanelRoutes */}
          {isAuth && roles === "admin" && (
            <Route path="/adminPanel" element={<Suspense fallback={null}><AdminPanelLayout /></Suspense>}>
              {/* Users Routes*/}
              <Route path="/adminPanel/users/create" element={<Suspense fallback={null}><CreatePage /></Suspense>} />
              <Route path="/adminPanel/users" element={<Suspense fallback={null}><AdminMain /></Suspense>} />
              <Route
                path="/adminPanel/users/userInfo/:id"
                element={<Suspense fallback={null}><UserInfo /></Suspense>}
              />
              <Route path="/adminPanel/users/edit/:id" element={<Suspense fallback={null}><EditUser /></Suspense>} />

              {/*News admin Routes */}
              <Route path="/adminPanel/editor/add" element={<Suspense fallback={null}><AddNews /></Suspense>} />
              <Route path="/adminPanel/newsList" element={<Suspense fallback={null}><NewsAdminList /></Suspense>} />
              <Route
                path="/adminPanel/news/newsInfo/:slug"
                element={<Suspense fallback={null}><NewsInfo /></Suspense>}
              />
              <Route
                path="/adminPanel/news/edit/:slug"
                element={<Suspense fallback={null}><EditNews /></Suspense>}
              />

              {/*Categories in AdminPanel */}
              <Route path="/adminPanel/categories" element={<Suspense fallback={null}><Categories /></Suspense>} />
              <Route
                path="/adminPanel/categories/categoryInfo/:id"
                element={<Suspense fallback={null}><CategoryDetailPage /></Suspense>}
              />
              <Route
                path="/adminPanel/categories/edit/:id"
                element={<Suspense fallback={null}><EditCategoryPage /></Suspense>}
              />
              <Route
                path="/adminPanel/categories/add"
                element={<Suspense fallback={null}><CreateCategory /></Suspense>}
              />
              <Route
                path="/adminPanel/categories/get/:id"
                element={<Suspense fallback={null}><CategoryPage /></Suspense>}
              />

              <Route path="*" element={<NoMatch />} />
            </Route>
          )}
      </Routes>
    </>
  );
}

export default App;
