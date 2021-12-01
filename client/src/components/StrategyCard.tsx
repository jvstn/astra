import {
  Card, CardContent, Typography
} from "@mui/material";
import React, { ReactElement } from "react";
import { StrategyContent } from "../features/StrategySelector/StrategyContent";
import StrategyModal from "../features/StrategySelector/StrategyModal";

interface Props {
  content: StrategyContent;
  // onClick: MouseEventHandler;
}

export default function StrategyCard({
  content,
}: Props): ReactElement {



  return (
    <>
      <Card variant="outlined" >
          <CardContent>
            <Typography variant="h5" component="div">
              {content.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {content.description}
            </Typography>
        </CardContent>
        <StrategyModal content={content} />
      </Card>
    </>
  );
}
