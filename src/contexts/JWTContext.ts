import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin, setLogout, setInitialize } from "src/redux/slices/user";
// utils
import { isValidToken, jwtDecode, setSession } from "src/utils/jwt";
// ----------------------------------------------------------------------

function AuthProvider({ ...props }) {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      dispatch(setInitialize());
      try {
        const token = localStorage.getItem("token");
        if (token && isValidToken(token)) {
          setSession(token);
          const newUser = jwtDecode(token);

          dispatch(setLogin(newUser));
        } else {
          dispatch(setLogout(null as any));
        }
      } catch (err) {
        console.error(err);
        dispatch(setLogout(null as any));
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}

export { AuthProvider };
