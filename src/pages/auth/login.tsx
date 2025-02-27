// next
import dynamic from "next/dynamic";
// ----------------------------------------------------------------------
// material
import {
  Box,
  Card,
  Stack,
  Container,
  Typography,
  CardContent,
} from "@mui/material";
// ----------------------------------------------------------------------
// components
const LoginForm = dynamic(() => import("src/components/_main/auth/loginForm"));
import { GuestGuard } from "src/guards";
// ----------------------------------------------------------------------

export default function Login() {
  return (
    <GuestGuard>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Container maxWidth="xs">
          <Card className="card">
            <CardContent>
              <Stack>
                <Typography textAlign="center" mb={2} variant="h4" gutterBottom>
                  Login
                </Typography>
                <Typography textAlign="center" color="text.secondary" mb={5}>
                  Login Account
                </Typography>
              </Stack>
              <LoginForm />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </GuestGuard>
  );
}
