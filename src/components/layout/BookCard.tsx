import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Book } from '../../types/Book';

function BookCard({ book }: { book: Book }) {
  const formatPrice = (book: Book) =>
    book.price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: book.currency,
    });

  const formatName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="card">
      <CardMedia
        component="img"
        height={300}
        image={book.img_urls[0]}
        alt={book.title}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            width: '250px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {formatName(book.title)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatName(book.author ?? book.publisher)}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '0.5rem',
        }}
      >
        <Typography className="card__originalPrice">
          {formatPrice(book)}
        </Typography>
        <Typography variant="h5" color={'primary.light'}>
          {formatPrice(book)}
        </Typography>
      </CardContent>
      <CardActions className="card__action">
        <Button variant="contained" size="medium" color="primary" fullWidth>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;
