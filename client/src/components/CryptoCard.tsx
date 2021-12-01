import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import React, { ReactElement } from 'react';
interface Props {
  productName: string;
  onClick: () => void;
}

export default function CryptoCard({productName, onClick}: Props): ReactElement {
  return (
    <Card sx={{ maxWidth: 150 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://cryptologos.cc/logos/thumbs/${productName}.png?v=014`}
          alt={productName}
        />
      </CardActionArea>
    </Card>
  );
}
