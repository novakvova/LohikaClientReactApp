import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { setAuthUserByToken } from "./components/auth/Login/action";
import { downloadCartData } from "./components/Cart/cart-actions";
import FleshMessages from "./components/FleshMessages";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

let token = localStorage.token;
if (token) {
  setAuthUserByToken(token, store.dispatch);
  downloadCartData();
}

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <FleshMessages />
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
