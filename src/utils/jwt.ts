import jwtDecode from "jwt-decode";
import { verify, sign } from "jsonwebtoken";
//
import axios from "./axios";

// ----------------------------------------------------------------------

const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (token: string) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(token);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign, jwtDecode };
