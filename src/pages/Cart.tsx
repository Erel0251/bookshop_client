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

function PlaceOrder() {
  return (
    <Card>
      <Container>
        <CardHeader title="Order Summary" />
        <Divider />
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom>
              Subtotal:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign={'right'} variant="body1" gutterBottom>
              $100
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom>
              Shipping:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign={'right'} variant="body1" gutterBottom>
              $10
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom>
              Tax:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign={'right'} variant="body1" gutterBottom>
              $5
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom>
              Total:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              textAlign={'right'}
              variant="h5"
              fontWeight={600}
              gutterBottom
            >
              $115
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ m: '1rem' }}>
          <Button variant="outlined" fullWidth>
            Place Order
          </Button>
        </Box>
      </Container>
    </Card>
  );
}

function Cart() {
  return (
    <Box className="body">
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
          <Grid item xs={9}>
            <DataTable />
          </Grid>
          <Grid item xs={3}>
            <PlaceOrder />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cart;
