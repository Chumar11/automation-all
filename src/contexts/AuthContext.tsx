import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { isValidToken, jwtDecode } from "src/utils/jwt";

const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkM2Y2MmEwMWMxY2RiZjFkZGI2ZmQiLCJlbWFpbCI6InRlc3RAY29tbWVyY2Vob3BlLmNvbSIsIm5hbWUiOiJLYW1yYW4gSGFpZGVyIiwiY292ZXIiOnsiX2lkIjoibXktdXBsb2Fkcy9ocGV3MHFtdG1kYWtzcnFtbXFkMSIsInVybCI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL3RlY2hnYXRlci9pbWFnZS91cGxvYWQvdjE2Nzc2MDU5NDIvbXktdXBsb2Fkcy9ocGV3MHFtdG1kYWtzcnFtbXFkMS5wbmcifSwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjg2NTU2NDc0LCJleHAiOjE2ODcxNjEyNzR9.nmyUSKZG3MD7jVd2PqA8AJ7v7YTSG5H-Y2v6eJfW42g";
export const AuthContext = createContext(null);
export const AuthProvider = ({ ...props }) => {
  const { children } = props;

  const [state, setState] = useState<any>({
    isAuthenticated: false,
    user: null,
    isInitialized: false,
  });
  const [Details, setDetails] = useState<any>([]);

  const login = ({ jwt, email, avatar, ...others }: any) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        avatar,
        ...others,
      })
    );

    setState({
      ...state,
      isAuthenticated: true,
      user: {
        email,
        avatar,
        ...others,
      },
    });
  };

  const logout = () => {
    // Perform logout logic
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState({
      ...state,
      isAuthenticated: false,
      user: null,
    });
  };

  const updateUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setState({
      ...state,
      user,
    });
  };

  const authContextValue: any = {
    ...state,
    login,
    logout,
    updateUser,
  };
  useEffect(() => {
    const checkToken = async () => {
      const token = await localStorage.getItem("token");
      const user = await localStorage.getItem("user");
      console.log("token : ", token);
      console.log("user : ", user);

      if (token && user) {
        setState({
          ...state,
          isAuthenticated: true,
          user: JSON.parse(user),
          isInitialized: true,
        });
      } else {
        setState({
          ...state,
          isAuthenticated: false,
          user: null,
          isInitialized: true,
        });
        console.log("reached there");
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
