import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import Sidebar from "../components/Sidebar";
import AssetSelector from "../features/AssetSelector/AssetSelector";
import StrategySelector from "../features/StrategySelector/StrategySelector";


export default function Dashboard(): ReactElement {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Sidebar>
          <AssetSelector />
          <StrategySelector />
        </Sidebar>
      </Box>
    </>
  );
}
