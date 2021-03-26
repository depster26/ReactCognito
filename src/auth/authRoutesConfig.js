import authPaths from "./authPaths";

import SignIn from "./SignIn";
import Register from "./Register";
import RegisterConfirm from "./RegisterConfirm";
import ResendRegisterCode from "./ResendRegisterCode";
import ForgotPassword from "./ForgotPassword";

const AUTH_ROUTES = [
  {
    path: authPaths.SIGN_IN,
    exact: true,
    key: "sign-in",
    component: SignIn,
  },
  {
    path: authPaths.REGISTER,
    exact: true,
    key: "register",
    component: Register,
  },
  {
    path: authPaths.REGISTER_CONFIRM,
    exact: true,
    key: "register-confirm",
    component: RegisterConfirm,
  },
  {
    path: authPaths.REGISTER_CONFIRM_RESEND_CODE,
    exact: true,
    key: "resend-register-confirm",
    component: ResendRegisterCode,
  },
  {
    path: authPaths.FORGOT_PASSWORD,
    exact: true,
    key: "forgot-password",
    component: ForgotPassword,
  },
];

export default AUTH_ROUTES;
