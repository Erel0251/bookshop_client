import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import DataTable from '../components/layout/Table';
import { useEffect } from 'react';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { formatPrice } from '../utils/Format.helper';
// import axios from 'axios';
// import { debounce } from 'lodash';

function PlaceOrder() {
  const cart = useAppSelector((state) => state.cart.items);

  const price = cart.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0,
  );
  const sale_price = cart.reduce(
    (acc, item) => acc + item.book.sale_price * item.quantity,
    0,
  );
  const currency = cart[0]?.book.currency || 'VND';
  const ship = 30000;
  const total = price - sale_price + ship;
  console.log(price, sale_price);

  return (
    <Card>
      <Container>
        <CardHeader title="Order Summary" />
        <Divider />
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Price:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign={'right'} variant="body1" gutterBottom>
              {formatPrice(price, currency)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Shipping:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign={'right'} variant="body1" gutterBottom>
              {formatPrice(ship, currency)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Sale:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign={'right'} variant="body1" gutterBottom>
              -{formatPrice(sale_price, currency)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" gutterBottom>
              Total:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              textAlign={'right'}
              variant="h5"
              fontWeight={600}
              gutterBottom
            >
              {formatPrice(total, currency)}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: '1rem' }}>
          {cart.length > 0 ? (
            <Button href="/checkout" variant="outlined" fullWidth>
              Place Order
            </Button>
          ) : (
            <Button variant="outlined" fullWidth disabled>
              Empty Cart
            </Button>
          )}
        </Box>
      </Container>
    </Card>
  );
}

function Cart() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user as User);

  useEffect(() => {
    if (user) {
      /*
      axios.get(`http://localhost:3000/user/${user.id}/cart`) 
        .then(response => {
          console.log('Cart loaded', response.data);
        })
        .catch(error => {
          console.error('Failed to load cart', error);
        });
        */
    }
  }, [user, dispatch]);

  return (
    <Box className="body" flexGrow={1}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
              Cart
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={7} lg={9}>
            <DataTable />
          </Grid>
          <Grid item xs={12} md={5} lg={3}>
            <PlaceOrder />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cart;
