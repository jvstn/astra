import { Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import CryptoCard from "../../components/CryptoCard";
import { useAppDispatch } from "../../store/hooks";
import { setSelectedAsset } from "./assetSelectorSlice";

interface Props {}

export default function AssetSelector({}: Props): ReactElement {
  const dispatch = useAppDispatch();

  const assets = {
    "BTC-USD": "bitcoin",
    LINK: "chainlink",
    BAT: "basic-attention-token",
  };

  return (
    <>
      <Typography textAlign="center" variant="h4" gutterBottom>
        Select an asset
      </Typography>
      <Stack display="flex" justifyContent="center" direction="row"  spacing={20}>
        {Object.entries(assets).map(([product_id, productName]) => (
          <CryptoCard
            onClick={() => dispatch(setSelectedAsset(product_id))}
            productName={productName}
          />
        ))}
      </Stack>
    </>
  );
}
