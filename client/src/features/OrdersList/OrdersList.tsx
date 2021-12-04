import { List, ListItem, Theme, Typography, Paper, Stack } from "@mui/material";
import { makeStyles, createStyles, ClassNameMap } from "@mui/styles";
import React, { ReactElement, useEffect } from "react";
import { socket } from "../../context/socket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewOrder, fetchOrders, Order, OrderType } from "./ordersSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderItem: {
      maxHeight: "5vw",
      width: "8vw",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
      marginTop: "1vw",
      borderRadius: "10px",
      color: "oldlace",
    },
    buySideItem: {
      backgroundColor: theme.palette.success.light,
    },
    sellSideItem: {
      backgroundColor: theme.palette.error.main,
    },
  })
);

interface Props {
  orderType: OrderType;
}

export default function OrdersList({ orderType }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders[orderType]);
  const classes: ClassNameMap = useStyles();
  const { buySideItem, sellSideItem, orderItem } = classes;

  const isBuySide = (order: Order): boolean => order.side === "buy";

  useEffect(() => {
    dispatch(fetchOrders(orderType));
    socket.on(orderType, (order) => {
      dispatch(addNewOrder(order));
      console.log(order);
    });
    return () => {
      socket.off(orderType);
    };
  }, [socket, dispatch, orderType]);

  return (
    <>
      <Typography variant="h6">{orderType.toUpperCase()}S</Typography>
        <List>
          {orders.map((order: Order) => (
            <ListItem
              key={order.id}
              className={`
              ${orderItem}
              ${isBuySide(order) ? buySideItem : sellSideItem}`}
            >
              <Stack spacing={2} alignItems="center" direction="row">
                <Typography variant="h5">{order.side.toUpperCase()}</Typography>
                <Typography variant="body1">
                  Price: {Number(order.price).toPrecision(5)}
                  <br />
                  Size: {Number(order.size).toPrecision(3)}
                </Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
    </>
  );
}
