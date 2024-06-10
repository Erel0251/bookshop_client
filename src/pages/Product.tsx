import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { DETAIL_BOOK_QUERY } from '../queries/book-query';
import { useQuery } from '@apollo/client';
import { Book } from '../types/Book';
import { formatPrice } from '../utils/Format.helper';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import BookDetail from '../components/layout/BookDetail';
import WriteReview from '../components/layout/WriteReview';
import { addToCart } from '../redux/slices/CartReducer';
import axios from 'axios';
import Reviewers from '../components/layout/Review';
import { useEffect } from 'react';

function AddToCart({ book }: { book: Book }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const paid = book.sale_price ?? book.price;
  const original =
    book.sale_price && book.sale_price !== book.price ? book.price : undefined;

  const handleAddToCart = async () => {
    const quantity = document.getElementById('quantity') as HTMLInputElement;
    const totalQuantity = Math.min(
      parseInt(quantity.value),
      book.inventory ? book.inventory : 1,
    );
    dispatch(
      addToCart({
        book,
        quantity: totalQuantity,
      }),
    );
    if (user) {
      try {
        await axios.post(
          `http://localhost:3000/user/cart`,
          {
            user_id: user.id,
            book_id: book.id,
            quantity: totalQuantity,
            update_type: 'Append',
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              role: user?.roles,
            },
            withCredentials: true,
          },
        );
      } catch (error) {
        alert('Failed to add item to cart, re-login maybe?');
      }
    }
  };

  const onClickMinus = () => {
    const quantity = document.getElementById('quantity') as HTMLInputElement;
    quantity.value = Math.max(1, parseInt(quantity.value) - 1).toString();
  };

  const onClickPlus = () => {
    const quantity = document.getElementById('quantity') as HTMLInputElement;
    quantity.value = (parseInt(quantity.value) + 1).toString();
  };

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '0.5rem',
          bgcolor: '#e0e0ee',
        }}
      >
        {original && (
          <Typography
            variant="h6"
            color={'gray'}
            sx={{ textDecoration: 'line-through' }}
          >
            {formatPrice(original, book.currency)}
          </Typography>
        )}
        <Typography variant="h4" fontWeight={900} color={'dark'}>
          {formatPrice(paid, book.currency)}
        </Typography>
      </CardContent>
      <Container
        sx={{
          height: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" m={'2rem 0 0 0'} gutterBottom>
            Quantity
          </Typography>
          <Typography variant="body2" m={'0 0 2rem 0'} gutterBottom>
            ({book.inventory} in stock)
          </Typography>
          <ButtonGroup variant="contained" color="primary" sx={{ m: '0 auto' }}>
            <IconButton
              disabled={
                (book.status && book.status !== 'AVAILABLE') ||
                book.inventory === 0
              }
              onClick={onClickMinus}
            >
              <Remove />
            </IconButton>
            <Input
              disabled={
                (book.status && book.status !== 'AVAILABLE') ||
                book.inventory === 0
              }
              id="quantity"
              type="text"
              defaultValue={1}
              sx={{ width: '7rem', textAlign: 'center' }}
            />
            <IconButton
              disabled={
                (book.status && book.status !== 'AVAILABLE') ||
                book.inventory === 0
              }
              onClick={onClickPlus}
            >
              <Add />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          fullWidth
          disabled={
            (book.status && book.status !== 'AVAILABLE') || book.inventory === 0
          }
        >
          Add to Cart
        </Button>
      </Container>
    </Card>
  );
}

function Product() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const params = useAppSelector((state) => state.review);

  const { data, loading, error, refetch } = useQuery(DETAIL_BOOK_QUERY, {
    variables: { id, ...params },
  });

  useEffect(() => {
    refetch({ id, ...params });
  }, [id, params, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  /*
  <Grid item xs={12}>
    <CategoryBreadcrumb />
  </Grid>
  */

  return (
    <Box className="body">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={8}>
            <BookDetail book={data.book} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AddToCart book={data.book} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Reviewers
              total={data.book.reviews.total}
              average={data.book.reviews.average}
              details={data.book.reviews.details}
              reviews={data.book.reviews.data}
            />
          </Grid>
          {user && (
            <Grid item xs={12} lg={4}>
              <WriteReview bookId={data.book.id} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Product;
