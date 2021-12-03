import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { SocketContext } from "../context/socket";
import AssetSelector from "../features/AssetSelector/AssetSelector";
import StrategySelector from "../features/StrategySelector/StrategySelector";


export default function Dashboard(): ReactElement {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('FILL', (data) => {
      console.log("FILL" ,data);
    })
    socket.on('OPEN', (data) => {
      console.log('OPEN', data);
    });

    socket.off('FILL');
    socket.off('OPEN');
  }, [socket]);
  
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Sidebar>
          <Grid>
            <Stack spacing={5}>
              <AssetSelector />
              <StrategySelector />
            </Stack>
          </Grid>
        </Sidebar>
      </Box>
    </>
  );
}
