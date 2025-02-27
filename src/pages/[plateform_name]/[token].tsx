import { useRouter } from "next/router";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import toast from "react-hot-toast";
import { GuestGuard } from "src/guards";
import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
export default function plateform() {
  const {
    push,
    query: { plateform_name, token },
  } = useRouter();
  const [loading, setloading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { login }: any = useContext(AuthContext);
  React.useEffect(() => {
    setloading(true);
    if (plateform_name && token) {
      const axios = require("axios");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/myself`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response: any) => {
          setloading(false);
          setError(false);
          toast.success("Login successfully");
          // console.log(JSON.stringify(response.data));
          login({
            ...response.data,
            jwt: token,
            // widget_type: widget_type,
            plateform_name,
          });
          push("/");
        })
        .catch((error: any) => {
          console.log(error);
          setloading(false);
          setError(true);
          toast.error("Something went wrong");
        });
    }
  }, [plateform_name, token]);

  if (loading) {
    return (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <GuestGuard>
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={2}
      >
        {error ? (
          <Alert
            severity="error"
            sx={{
              maxWidth: 300,
            }}
          >
            <AlertTitle>Error</AlertTitle>
            Something went wrong!
          </Alert>
        ) : (
          <Alert
            severity="success"
            sx={{
              maxWidth: 300,
            }}
          >
            <AlertTitle>Success</AlertTitle>
            You've logged in successfully!
          </Alert>
        )}
      </Stack>
    </GuestGuard>
  );
}
