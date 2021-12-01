import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import CryptoCard from "../components/CryptoCard";
import Sidebar from "../components/Sidebar";
import AssetSelector from "../features/AssetSelector/AssetSelector";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Sidebar>
          <AssetSelector />
        </Sidebar>
      </Box>
    </>
  );
}
