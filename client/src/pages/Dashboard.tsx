import { ClassNameMap, Grid, Stack, Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { ReactElement, useContext, useEffect } from "react";
import LineGraph from "../components/LineGraph";
import Sidebar from "../components/Sidebar";
import { SocketContext } from "../context/socket";
import AssetData from "../features/AssetData/AssetData";
import AssetSelector from "../features/AssetSelector/AssetSelector";
import Sidepanel from "../features/OrdersList/Sidepanel";
import OrdersList from "../features/OrdersList/Sidepanel";
import StrategySelector from "../features/StrategySelector/StrategySelector";

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      display: "flex",
      justifyContent: "center",
    },
  });
});

export default function Dashboard(): ReactElement {
  const socket = useContext(SocketContext);
  const classes: ClassNameMap = useStyles();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("FILL", (data) => {
      console.log("FILL", data);
    });
    socket.on("OPEN", (data) => {
      console.log("OPEN", data);
    });

    

    socket.off("FILL");
    socket.off("OPEN");
  }, [socket]);

  return (
    <>
      <Box className={classes.root}>
        <Sidebar>
          <Grid container spacing={3}>
            <Grid item md={1}>
              <AssetSelector />
            </Grid>
            <Grid item md={8}>
              <Stack spacing={5}>
                <AssetData />
                <StrategySelector />
              </Stack>
            </Grid>
            <Grid item md={3}>
              <Sidepanel />
            </Grid>
          </Grid>
        </Sidebar>
      </Box>
    </>
  );
}
