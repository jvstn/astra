import { List, ListItem, Stack, Theme, Typography } from '@mui/material';
import { ClassNameMap, createStyles, makeStyles } from '@mui/styles';
import React, { ReactElement } from 'react'
import { Order, OrderType } from '../features/OrdersList/ordersSlice'
interface Props {
  orders: Order[];
  orderType: OrderType;

}

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

export default function OrdersList({ orders, orderType }: Props): ReactElement {
  const classes: ClassNameMap = useStyles();
  const { buySideItem, sellSideItem, orderItem } = classes;

  const isBuySide = (order: Order): boolean => order.side === "buy";

  return (
    <>
      <Typography variant="h6">{orderType.toUpperCase()}S</Typography>
      <List aria-live="polite">
        {orders.map((order: Order, index) => (
          <ListItem
            key={index}
            role="listitem"
            aria-posinset={index + 1}
            aria-setsize={orders.length}
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
