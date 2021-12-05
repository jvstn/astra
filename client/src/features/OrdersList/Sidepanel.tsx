import { Stack } from "@mui/material";
import { ClassNameMap } from "@mui/styles";
import React, { ReactElement, useEffect } from "react";
import OrdersList from "../../components/OrdersList";
import { socket } from "../../context/socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewOrder, fetchOrders } from "./ordersSlice";




export default function Sidepanel(): ReactElement {
  const dispatch = useAppDispatch();
  const fills = useAppSelector((state) => state.orders.fill);
  const opens = useAppSelector((state) => state.orders.open);
  

  useEffect(() => {
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
  }, [socket, dispatch]);

  return (
    <>
      <Stack>
        <OrdersList orders={fills} orderType="fill" />
        <OrdersList orders={opens} orderType="open" />
      </Stack>
    </>
  );
}
