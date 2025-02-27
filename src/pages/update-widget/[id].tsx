import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as api from "src/services";
import HomePage from "@/src/components/homePage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useQuery } from "react-query";
import { AuthGuard } from "@/src/guards";
import { filter } from "lodash";
// import {Page} from
export default function Page() {
  const { user }: any = useContext(AuthContext);
  const router = useRouter();
  const [state, setState] = useState<any>([]);
  const pathId = router.query.id;
  console.log("pathId", pathId);
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`/api/domain?userId=${user._id}`); // Replace 'yourUserId' with the actual user ID
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("response data:", data);
        setState(data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, [user]);
  const filterId = state.find((item: any) => item.id === pathId);
  const mainId = filterId?._id;
  console.log("mainId", mainId);

  console.log(filterId);
  const { data, isLoading } = useQuery(["all blog", filterId?._id], () =>
    api.getWidgetSettings(filterId)
  );

  return (
    <AuthGuard>
      {/* <Page> */}
      <Box>{data && <HomePage data={data} isloading={isLoading} />}</Box>
      {/* </Page> */}
    </AuthGuard>
  );
}
