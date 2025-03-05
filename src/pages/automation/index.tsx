import Automation from "@/src/components/automation";
import { AuthGuard } from "@/src/guards";
import React from "react";

const index = () => {
  return (
    <AuthGuard>
      <Automation />
    </AuthGuard>
  );
};

export default index;
