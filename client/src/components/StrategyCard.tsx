import {
  Card,
  CardContent, Typography
} from "@mui/material";
import React, { ReactElement } from "react";
import StrategyModal from "../features/StrategySelector/StrategyModal";
import { StrategyContent } from "../utils/strategyContent";



interface Props {
  content: StrategyContent;
}

export default function StrategyCard({ content }: Props): ReactElement {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ mb: 1 }} variant="h4" fontWeight="bold" fontSize={13} component="div">
            {content.name}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            variant="body1"
            fontSize={11}
            color="text.secondary"
          >
            {content.description}
          </Typography>
        </CardContent>
        <StrategyModal content={content} />
      </Card>
    </>
  );
}
