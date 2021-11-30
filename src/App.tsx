import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./comonents/Home";
import Register from "./comonents/auth/Register/index";
import DefaultLayout from "./comonents/containers/DefaultLayout";
import AddNewCar from "./comonents/AddNewCar";
import LoginPage from "./comonents/auth/Login";
import Cart from "./comonents/Cart/Cart";
import { useTypedSelector} from './hooks/useTypedSelector';


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
        </Route>
      </Routes>
    </>
  );
}

export default App;
