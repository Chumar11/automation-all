// next
import dynamic from "next/dynamic";
import RouterLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
// ----------------------------------------------------------------------
// material
import { Box, Card, Stack, Link, Container, Typography } from "@mui/material";
// ----------------------------------------------------------------------
// components
const LoginForm = dynamic(() => import("./loginForm"));
import GuestGuard from "src/guards/guestGuard";
// ----------------------------------------------------------------------

export default function Login() {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <GuestGuard>
      <Box className="auth-pages">
        <Box className="gradient">
          <Typography
            textAlign="center"
            variant="h3"
            fontWeight={300}
            lineHeight={0.7}
            color="primary.contrastText"
          >
            {t("welcome")}
          </Typography>
          <Typography
            textAlign="center"
            variant="h2"
            color="primary.contrastText"
            className="company-name"
          >
            {t("company")}
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            lineHeight={0.9}
            color="primary.contrastText"
          >
            {t("slogan")}
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <Card className="card">
            <Stack>
              <Typography textAlign="center" mb={2} variant="h4" gutterBottom>
                {t("login")}
              </Typography>
              <Typography textAlign="center" color="text.secondary" mb={5}>
                {t("login-account")}
              </Typography>
            </Stack>
            <LoginForm />

            <Typography variant="body2" align="center" mt={3}>
              {t("Dont-account")}&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                href={`/auth/register${
                  router.query?.redirect
                    ? "?redirect=" + router.query?.redirect
                    : ""
                }`}
              >
                {t("get-started")}
              </Link>
            </Typography>
          </Card>
        </Container>
      </Box>
    </GuestGuard>
  );
}
