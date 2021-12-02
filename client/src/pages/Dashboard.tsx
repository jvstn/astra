import { Box } from "@mui/system";
import React, { ReactElement, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AssetSelector from "../features/AssetSelector/AssetSelector";
import StrategySelector from "../features/StrategySelector/StrategySelector";
import { io } from "socket.io-client";


export default function Dashboard(): ReactElement {
  const socket = io("http://localhost:5000");
  socket.on("connect", () => {
    console.log("connected to the ether");
  });
  socket.on("message", (msg) => {
    console.log("message", msg);
  });

  
  
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
