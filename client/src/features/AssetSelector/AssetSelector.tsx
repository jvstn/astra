import { Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import CryptoCard from "../../components/CryptoCard";
import { useAppDispatch } from "../../store/hooks";
import { setSelectedAsset } from "./assetSelectorSlice";


export default function AssetSelector(): ReactElement {
  const dispatch = useAppDispatch();

  const assets = {
    "BTC-USD": "bitcoin",
    "ETH-BTC": "ethereum",
  };

  return (
    <>
      <Typography textAlign="center" variant="body1" gutterBottom>
        Select <br/> Asset
      </Typography>
      <Stack display="flex" justifyContent="center"  spacing={20}>
        {Object.entries(assets).map(([product_id, productName]) => (
          <CryptoCard
            onClick={() => dispatch(setSelectedAsset(product_id))}
            product_id={product_id}
          />
        ))}
      </Stack>
    </>
  );
}
