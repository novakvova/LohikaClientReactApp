import * as CarActionCreators from "../../components/CarsList/car-actions";
import * as AuthActionCreators from "../../components/auth/Login/action";
import * as RegActionCreators from "../../components/auth/Register/actions";
import * as ProfileActionCreators from "../../components/Profile/actions";
import * as UsersActionCreators from "../../components/adminPanel/Users/actions";
import * as SendingCarActionCreators from "../../components/CarsList/AddNewCar/addCar";
import * as CartActionCreators from "../../components/Cart/cart-actions";
import * as FleshMessagesActionCreator from "../../components/FleshMessages/actions";
import * as RecoverPasswordActionCreator from "../../components/auth/recoverPassword/action";
import * as PaginateActionCreator from "../../components/adminPanel/Users/Paginator/action";
import * as CategoryActionCreators from "../../components/Categories/actions";

import * as CarImageActionCreators from "../../components/containers/CropperMultiple/actionCropperMultiple";

import * as NewsActionCreators from "../../components/adminPanel/News/action";

const actions = {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
  ...ProfileActionCreators,
  ...UsersActionCreators,
  ...FleshMessagesActionCreator,
  ...RecoverPasswordActionCreator,
  ...PaginateActionCreator,
  ...CategoryActionCreators,

  ...CarImageActionCreators,

  ...NewsActionCreators,
};

export default actions;
