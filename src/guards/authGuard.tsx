import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// material
import { Box, CircularProgress } from "@mui/material";
// redux
import { AuthContext } from "src/contexts/AuthContext";
// login
const Login = dynamic(() => import("src/pages/auth/login"));

const AuthGuard = ({ ...props }) => {
  const { children } = props;
  const { isAuthenticated, isInitialized }: any = useContext(AuthContext);
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname as any);
      }
      // Simulate an asynchronous login process
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the delay time as needed
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isInitialized]);

  console.log("pathname", pathname);

  if (isLoading) {
    // Render a loading indicator while logging in
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated && !isLoading) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    push(requestedLocation);
    return null;
  }

  return children;
};

export default AuthGuard;
