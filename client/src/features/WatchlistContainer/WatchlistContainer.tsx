import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, Typography } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import CryptoCard from "../../components/CryptoCard";
import LineGraph from "../../components/LineGraph";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteWatchlistItem,
  getProductList,
  getWatchlist,
  postWatchlistItem
} from "./watchlistSlice";
interface Props {}

export default function WatchlistContainer({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.watchlist.products);
  const watchlist = useAppSelector((state) => state.watchlist.watchlist);

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getWatchlist("justinmc"));
  }, []);

  const handleAddToWatchlist = (product_id: string) => {
    dispatch(postWatchlistItem({ product_id, username: "justinmc" }));
    window.location.reload();
  };

  const handleDeleteWatchlistItem = (product_id: string) => {
    dispatch(deleteWatchlistItem({ product_id, username: "justinmc" }));
    window.location.reload();
  };

  return (
    <>
      <Stack spacing={10}>
        <Stack direction="row">
          {watchlist.map(({ product_id, assetData }, index) => (
            <>
              <Stack flexWrap="wrap">
                <Stack spacing={20} direction="row">
                  <Typography key={index}>{product_id}</Typography>
                  <DeleteIcon
                    color="error"
                    cursor="pointer"
                    onClick={() => handleDeleteWatchlistItem(product_id)}
                  />
                </Stack>
                <LineGraph
                  name={product_id}
                  dates={assetData.dates.slice(0, 10)}
                  values={assetData.prices.slice(0, 10)}
                  height={200}
                />
              </Stack>
            </>
          ))}
        </Stack>
        {/* <Typography> Add to Watchlist </Typography> */}
        <Stack spacing={10} flexWrap="wrap" direction="row">
          {productList.map((product_id, index) => (
            <CryptoCard key={index} product_id={product_id} onClick={() => handleAddToWatchlist(product_id)} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
