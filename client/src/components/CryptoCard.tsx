import { CardActionArea, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import React, { ReactElement } from 'react';
import { PRODUCT_NAMES } from '../utils/productNames';
interface Props {
  product_id: string;
  onClick?: () => void;
  watchlist?: boolean;
}

export default function CryptoCard({ product_id, onClick }: Props): ReactElement {
  const baseName = product_id.split('-')[0];
  const name = PRODUCT_NAMES[baseName].toLowerCase();
  return (
    <Card sx={{ maxWidth: 70 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`https://cryptologos.cc/logos/thumbs/${name}.png?v=014`}
          alt={name}
        />
        <CardContent>
          <Typography variant="body2">{product_id}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
