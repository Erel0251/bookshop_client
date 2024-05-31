import { Container, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Container
      style={{
        textAlign: 'center',
        margin: 'auto',
      }}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Page Not Found
      </Typography>
    </Container>
  );
};

export default NotFound;
