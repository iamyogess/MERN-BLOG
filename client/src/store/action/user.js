import { userAction } from "../reducers/userReducer.js";

const logout = () => (dispatch) => {
  dispatch(userAction.resetUserInfo());
  localStorage.removeItem("account");
};

export default logout;
