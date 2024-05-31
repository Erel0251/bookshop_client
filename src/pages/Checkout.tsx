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

const CheckoutForm = () => {
  return (
    <Container>
      <form>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
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
      </form>
    </Container>
  );
};

const OrderSummary = ({ items, totalPrice, totalDiscount }) => {
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
                <Typography variant="body1">${item.price}</Typography>
                {item.sale_price && (
                  <Typography variant="body1" color="error">
                    -${item.price - item.sale_price}
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
                ${totalPrice}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" color="error">
                Total Discount:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={'right'} variant="body1" color="error">
                -${totalDiscount}
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
                ${totalPrice - totalDiscount}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

function CheckOut() {
  const items = [
    {
      name: 'Item 1',
      quantity: 2,
      price: 50,
      sale_price: 40,
      image: 'path/to/image1.jpg',
    },
    {
      name: 'Item 2',
      quantity: 1,
      price: 100,
      sale_price: 80,
      image: 'path/to/image2.jpg',
    },
    { name: 'Item 3', quantity: 3, price: 30, image: 'path/to/image3.jpg' },
  ];

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalDiscount = 20; // Example discount

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
