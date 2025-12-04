import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ImgMediaCard({image, title, bodyText, onLearnMoreClick}) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#e1e2e7' }}>
      <CardActionArea onClick={onLearnMoreClick}>
      {/*<CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
        /*image="/static/images/cards/contemplative-reptile.jpg"
      />*/}
      <CardContent sx={{ textAlign: 'left '}}>
        <Typography sx={{ fontWeight: 550, borderBottom: '1px solid' }} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {bodyText}
        </Typography>
      </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" onClick={onLearnMoreClick} sx={{ color: '#141a28' }}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
