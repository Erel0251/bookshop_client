import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Book } from '../../types/Book';
import { useNavigate } from 'react-router-dom';
import { formatName, formatPrice } from '../../utils/Format.helper';

function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();

  const onAddToCart = (e: SelectChangeEvent) => {
    e.stopPropagation();
    console.log('Add to cart');
  };

  const onViewDetail = () => {
    navigate(`/product/${book.id}`);
  };

  return (
    <Card className="card" onClick={onViewDetail}>
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
        {book.sale_price ? (
          <>
            <Typography className="card__originalPrice">
              {formatPrice(book.price, book.currency)}
            </Typography>
            <Typography variant="h5" color={'primary.light'}>
              {formatPrice(book.sale_price, book.currency)}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" color={'primary.light'}>
            {formatPrice(book.price, book.currency)}
          </Typography>
        )}
      </CardContent>
      <CardActions className="card__action">
        <Button
          variant="contained"
          size="medium"
          color="primary"
          fullWidth
          onClick={onAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;
