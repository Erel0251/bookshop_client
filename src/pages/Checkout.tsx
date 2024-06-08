import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { formatPrice } from '../utils/Format.helper';
import axios from 'axios';
import { clearCart } from '../redux/slices/CartReducer';

const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const order = {
      user_id: user?.id,
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      ward: data.get('ward'),
      district: data.get('district'),
      province: data.get('province'),
      address: data.get('address'),
      shipping: 30000,
      order_details: cartItems.map((item) => ({
        book_id: item.book.id,
        price: item.book.price,
        discount: item.book.sale_price / item.book.price,
        total_price: (item.book.sale_price || item.book.price) * item.quantity,
        quantity: item.quantity,
      })),
    };
    axios
      .post('http://localhost:3000/order', order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          role: user?.roles,
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(clearCart());
        window.location.href = '/order-success';
      })
      .catch((error) => {});
  };

  return (
    <Container>
      <Box component={'form'} onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              defaultValue={user?.last_name + ' ' + user?.first_name}
              required
              id="name"
              name="name"
              label="Full Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              defaultValue={user?.email}
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              defaultValue={user?.phone}
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField required id="ward" name="ward" label="Ward" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="district"
              name="district"
              label="District"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="province"
              name="province"
              label="Province"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const OrderSummary = ({
  items,
  totalPrice,
  totalDiscount,
  currency,
}: {
  items: any[];
  totalPrice: number;
  totalDiscount: number;
  currency: string;
}) => {
  const ship = 30000;
  const total = totalPrice + ship - totalDiscount;

  return (
    <Container>
      <Box>
        <List>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={item.image}
                    alt={item.name}
                    style={{ width: 60, height: 60 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ p: '1rem' }}
                  primary={item.name}
                ></ListItemText>
              </ListItem>
              {index < items.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'end',
                  width: '4rem',
                  margin: 'auto',
                }}
              >
                <Typography variant="body1">
                  {formatPrice(item.price, currency)}
                </Typography>
                {item.sale_price && (
                  <Typography variant="body1" color="error">
                    -{formatPrice(item.price - item.sale_price, currency)}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </List>
        <Box padding={2}>
          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            <Grid item xs={8}>
              <Typography variant="body1">Total Price:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={'right'} variant="body1" gutterBottom>
                {formatPrice(totalPrice, currency)}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">Ship Price:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={'right'} variant="body1" gutterBottom>
                {formatPrice(ship, currency)}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" color="error">
                Total Discount:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={'right'} variant="body1" color="error">
                -{formatPrice(totalDiscount, currency)}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5" fontWeight={600}>
                Final Price:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={'right'} variant="h5" fontWeight={600}>
                {formatPrice(total, currency)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

function CheckOut() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const items = cartItems.map((item) => ({
    name: item.book.title,
    image: item.book.img_urls[0],
    quantity: item.quantity,
    price: item.book.price,
    sale_price: item.book.sale_price,
  }));

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalDiscount = items.reduce(
    (total, item) =>
      total + (item.price - (item.sale_price || item.price)) * item.quantity,
    0,
  );

  const currency = cartItems[0]?.book.currency || 'VND';

  return (
    <Box className="body">
      <Container>
        <Card>
          <CardHeader title="Checkout" />
          <Divider />
          <CardContent>
            <Stepper activeStep={1} alternativeLabel>
              <Step>
                <StepLabel>Order</StepLabel>
              </Step>
              <Step>
                <StepLabel>Fill Detail</StepLabel>
              </Step>
              <Step>
                <StepLabel>Order Success</StepLabel>
              </Step>
            </Stepper>
          </CardContent>
          <CardContent>
            <Grid container spacing={2} style={{ marginTop: '1rem' }}>
              <Grid item xs={7}>
                <CheckoutForm />
              </Grid>
              <Grid item xs={5}>
                <OrderSummary
                  items={items}
                  totalPrice={totalPrice}
                  totalDiscount={totalDiscount}
                  currency={currency}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default CheckOut;
