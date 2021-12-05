import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { StrategyContent } from "../../utils/strategyContent";
import { OrderSide, setSelectedStrategy, startStrategy, StrategyRequestBody } from "./strategySlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  content: StrategyContent;
}

interface IIndexable {
  [key: string]: any;
}

export default function StrategyModal({ content }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const { selectedAsset } = useAppSelector((state) => state.asset);
  const { name, inputs, id } = content;
  const [open, setOpen] = useState(false);
  const [interval, setInterval] = useState(10);
  const [size, setSize] = useState<Number>();
  const [price, setPrice] = useState<Number>();
  const [side, setSide] = useState<OrderSide>();
  const handleOpen = () => {
    setOpen(true);
    dispatch(setSelectedStrategy(id));
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = (body: StrategyRequestBody) => {
    console.log(body);
    dispatch(startStrategy(body));
    handleClose();
  };

  const handleIntervalChange = (value: string) => {
    setInterval(Number(value));
  };
  const handleSizeChange = (value: string) => {
    setSize(Number(value));
  };
  const handlePriceChange = (value: string) => {
    setPrice(Number(value));
  };
  const handleSideChange = (value: string) => {
    setSide(value as OrderSide);
  };

  const inputValues: IIndexable = {
    interval: interval,
    amount: size,
    price: price,
  };

  const inputSetters: IIndexable = {
    interval: handleIntervalChange,
    size: handleSizeChange,
    price: handlePriceChange,
    side: handleSideChange,
  };

  const requestBody: StrategyRequestBody = {
    product_id: selectedAsset,
    ...(interval && { interval }),
    ...(size && { size }),
    ...(price && { price }),
    ...(side && { side }),
  };

  return (
    <div>
      <Button onClick={handleOpen}>Start</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={5}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name}
            </Typography>

            {inputs.map((input, index) =>
              !input.options ? (
                <FormControl key={index}>
                  <TextField
                    id={input.name}
                    type="number"
                    label={input.name}
                    value={inputValues[input.name]}
                    onChange={(e) =>
                      inputSetters[input.name](e.currentTarget.value)
                    }
                  />
                </FormControl>
              ) : (
                <FormControl key={index}>
                  <InputLabel htmlFor={input.name}>{input.name}</InputLabel>
                  <Select
                    label={input.name}
                    onChange={(e: SelectChangeEvent<string>) =>
                      inputSetters[input.name](e.target.value as string)
                    }
                  >
                    {input.options.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            )}
          <Button onClick={() => handleSubmit(requestBody)}>Submit</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
