import { Box, Container, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" className="footer">
          <Box display="flex" alignItems="center" flexGrow={0}>
            <img src="./src/assets/images/book.png" alt="logo" width={180}/>
          </Box>
          <Container sx={{ display: 'flex', flexDirection: 'column', gap:'1rem', m: '0'}}>
          <Typography variant="h6">BookWorm</Typography>
          <Typography variant="body2">Address</Typography>
          <Typography variant="body2">Phone</Typography>
          </Container>
    </Box>
  );
}

export default Footer;