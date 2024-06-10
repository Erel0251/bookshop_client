import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Book } from '../../types/Book';
import { useNavigate } from 'react-router-dom';
import { formatName, formatPrice } from '../../utils/Format.helper';
import AddToCart from './AddToCart';

function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const color = book.status === 'COMING_SOON' ? '#4caf50' : '#f44336';

  const onViewDetail = () => {
    navigate(`/product/${book.id}`);
  };

  return (
    <Card
      sx={{ position: 'relative', cursor: 'pointer' }}
      className="card"
      onClick={onViewDetail}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={300}
          image={book.img_urls[0]}
          alt={book.title}
          sx={{ objectFit: 'contain' }}
        />
        {book.status && book.status !== 'AVAILABLE' && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.4)', // semi-transparent white background
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                transform: 'rotate(-23deg)',
                color: color,
                padding: '0.5rem',
                border: '2px solid ' + color,
                borderRadius: '0.5rem',
              }} // rotate only the text
            >
              {book.status === 'COMING_SOON' ? 'Coming Soon' : 'Out of Stock'}
            </Typography>
          </Box>
        )}
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
          {book.sale_price && book.sale_price !== book.price ? (
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
          <AddToCart book={book} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default BookCard;
