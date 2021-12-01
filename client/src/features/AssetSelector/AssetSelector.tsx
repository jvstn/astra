import { Stack } from "@mui/material";
import React, { ReactElement } from "react";
import CryptoCard from "../../components/CryptoCard";
import { useAppDispatch } from "../../store/hooks";
import { setSelectedAsset } from "./assetSelectorSlice";

interface Props {}

export default function AssetSelector({}: Props): ReactElement {
  const dispatch = useAppDispatch();

  const assets = {
    BTC: "bitcoin",
    LINK: "chainlink",
    BAT: "basic-attention-token",
  };

  return (
    <>
      <Stack direction="row" spacing={20}>
        {Object.values(assets).map((asset) => (
          <CryptoCard
            onClick={() => dispatch(setSelectedAsset(asset))}
            productName={asset}
          />
        ))}
      </Stack>
    </>
  );
}
