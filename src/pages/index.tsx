// react
import React, { Suspense, useEffect } from "react";
// next
import RouterLink from "next/link";
import { useState, useContext } from "react";
// material
import { Container, Typography, Link, Box } from "@mui/material/";
import { Page } from "../../src/components";
import { AuthGuard } from "../../src/guards/index";
// components
// import HomeMain from "../components/_main/";
import { useQuery } from "react-query";
// import * as api from "src/services";
import { AuthContext } from "../../src/contexts/AuthContext";
import { widgets } from "../config";
import axios from "axios";
import HomePage from "src/components/homePage";
import * as api from "src/services";
import { lazy } from "react";
import { useRouter } from "next/navigation";
// const HomeMain = lazy(() => import("src/components/homePage"));
function Home() {
  const { user }: any = useContext(AuthContext);
  const { data, isLoading } = useQuery(["all blog", user?._id], () =>
    api.getWidgetSettings(user)
  );
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  // const isLoading = true;

  console.log("fetch-data", data);
  return (
    <AuthGuard>
      <Page>
        {/* <Container> */}
        <Box>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <HomePage data={data} isloading={isLoading} />
          {/* </Suspense> */}
        </Box>
        {/* </Container> */}
        {/* <Typography variant="body1" color={themColor.primary} textAlign="end" mt={3}>
          Powered by
          <Link href="#" underline="none" ml={1} component={RouterLink}>
            ichonic
          </Link>
        </Typography> */}
      </Page>
    </AuthGuard>
  );
}

export default Home;
