import { Stack, Typography } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import OrdersList from "../../components/OrdersList";
import { socket } from "../../context/socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewOrder, fetchOrders, getAccountBalances } from "./ordersSlice";

export default function Sidepanel(): ReactElement {
  const dispatch = useAppDispatch();
  const fills = useAppSelector((state) => state.orders.fill);
  const opens = useAppSelector((state) => state.orders.open);
  const selectedAsset = useAppSelector((state) => state.asset.selectedAsset);
  const [baseCurrency, quoteCurrency] = selectedAsset.split("-");
  const baseBalance = useAppSelector((state) => state.orders.baseBalance);
  const quoteBalance = useAppSelector((state) => state.orders.quoteBalance);

  useEffect(() => {
    dispatch(getAccountBalances());

    dispatch(fetchOrders("open"));
    dispatch(fetchOrders("fill"));

    socket.on("fill", (order) => {
      dispatch(addNewOrder(order));
    });
    socket.on("open", (order) => {
      dispatch(addNewOrder(order));
    });
    return () => {
      socket.off("fill");
      socket.off("open");
    };
  }, [socket, dispatch, selectedAsset]);

  return (
    <>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="body1">{quoteCurrency} balance</Typography>
          <Typography variant="h5">{quoteBalance.toPrecision(8)}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body1">{baseCurrency} balance</Typography>
          <Typography variant="h5">{baseBalance.toPrecision(5)}</Typography>
        </Stack>
        <Stack>
          <OrdersList orders={fills} orderType="fill" />
          <OrdersList orders={opens} orderType="open" />
        </Stack>
      </Stack>
    </>
  );
}
