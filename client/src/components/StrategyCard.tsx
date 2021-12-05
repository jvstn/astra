import {
  Card,
  CardContent,
  ClassNameMap,
  createStyles,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { ReactElement } from "react";
import { StrategyContent } from "../utils/strategyContent";
import StrategyModal from "../features/StrategySelector/StrategyModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "16vw",
    },
    cardText: {
      fontSize: "12rem"
    }
  })
);

interface Props {
  content: StrategyContent;
}

export default function StrategyCard({ content }: Props): ReactElement {
  const classes: ClassNameMap = useStyles();
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h4" fontSize={17} component="div">
            {content.name}
          </Typography>
          <Typography sx={{mb: 1.5}}  fontSize={15}  color="text.secondary">
            {content.description}
          </Typography>
        </CardContent>
        <StrategyModal content={content} />
      </Card>
    </>
  );
}
