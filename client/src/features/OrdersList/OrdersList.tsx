import { List, ListItem } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import { socket } from "../../context/socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchOrders, Order, OrderType } from "./ordersSlice";

interface Props {
  orderType: OrderType;
}

export default function OrdersList({ orderType }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders[orderType]);

  useEffect(() => {
    dispatch(fetchOrders(orderType));
    socket.on(orderType, (order) => {
      console.log(`${orderType}: `, order);
});
    return () => {
      socket.off(orderType);
    }
  }, [socket, dispatch, orderType]);

  return (
    <>
      <List>
        {orders.map((order: Order) => (
          <ListItem key={order.id}>
            {`Side: ${order.side}, Price: ${order.price}, Size: ${order.size}`}
          </ListItem>
        ))}
      </List>
    </>
  );
}
