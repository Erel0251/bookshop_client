import { Done } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

function OrderSuccess() {
  return (
    <Box className="body" flexGrow={1}>
      <Container>
        <Card>
          <CardHeader title="Checkout" />
          <Divider />
          <CardContent>
            <Stepper activeStep={2} alternativeLabel>
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
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
              gap: '2rem',
            }}
          >
            <Typography variant="h3">Order Success</Typography>
            <Typography variant="body1">
              Thank you for your order. We will contact you soon.
            </Typography>
            <Done sx={{ fontSize: 40, color: 'primary.light' }} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default OrderSuccess;
