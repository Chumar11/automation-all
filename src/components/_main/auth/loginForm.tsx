import * as Yup from "yup";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import RouterLink from "next/link";
import { useFormik, Form, FormikProvider } from "formik";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
//
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import toast from "react-hot-toast";
import { AuthContext } from "src/contexts/AuthContext";
import { useMutation } from "react-query";
import * as api from "src/services";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const { login }: any = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation(api.login, {
    onSuccess: (data) => {
      setloading(false);
      toast.success("Logged in successfully.");
      login(data);
      router.push("/");
    },
    onError: (err: any) => {
      setloading(false);
      toast.error("Email or password is wrong.");
    },
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Valid Email").required("Email Required"),
    password: Yup.string().required("Password required"),
    // widgetType: Yup.string().required("Widget Type Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // widgetType: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setloading(true);
      mutate(values);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={"Email Address"}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label={"Password"}
            {...getFieldProps("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? (
                      <RemoveRedEyeRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {/* <Autocomplete
            disablePortal
            fullWidth
            options={options}
            onChange={(
              event: React.SyntheticEvent,
              newValue: string | null
            ) => {
              if (newValue) {
                formik.setFieldValue("widgetType", newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Widget"
                {...getFieldProps("widgetType")}
                fullWidth
                error={Boolean(touched.widgetType && errors.widgetType)}
                helperText={touched.widgetType && errors.widgetType}
              />
            )}
          /> */}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link component={RouterLink} variant="subtitle2" href="">
            {"Forgot Password"}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          {"Login"}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
