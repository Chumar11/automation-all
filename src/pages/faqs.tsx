import React, { useContext, useState } from "react";
// next
import RouterLink from "next/link";
// material
import { Container, Grid, Typography, Link } from "@mui/material";
import dynamic from "next/dynamic";
import { Page } from "src/components";
import { faqsConfig } from "src/components/_main/faqs/config";

import Alert from "@/src/components/UI/Dialogue";
import SubscriptionAlert from "@/src/components/UI/subscription-alert";
import { AuthContext } from "../contexts/AuthContext";
import { AuthGuard } from "../guards";
import Script from "next/script";
const FaqsCard = dynamic(() => import("src/components/_main/faqs"));

export default function DemoMain() {
  const [open, setOpen] = useState(false);
  const { user }: any = useContext(AuthContext);
  return (
    <>
      {user?.plan === "free" ? (
        <SubscriptionAlert setOpen={setOpen} />
      ) : (
        <AuthGuard>
          <Page title="FAQS - ichonic" description="" canonical="faqs">
            <Container>
              <Typography variant="h3" color="text.primary" mb={3}>
                Frequently Asked Questions
              </Typography>
              <Grid container spacing={2}>
                {faqsConfig.map((value: any) => (
                  <Grid item xs={12} sm={12} md={4}>
                    <FaqsCard item={value} />
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Typography
              variant="body1"
              color="text.primary"
              textAlign="end"
              mt={3}
            >
              Powered by
              <Link href="#" underline="none" ml={1} component={RouterLink}>
                ichonic
              </Link>
            </Typography>
          </Page>
        </AuthGuard>
      )}

      {open && <Alert open={open} setOpen={setOpen} />}
    </>
  );
}
