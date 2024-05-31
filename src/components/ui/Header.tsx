import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

function Header() {
  return (
    <>
      <AppBar className="header">
        <CssBaseline>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography variant="h6" component="div">
              BookWorm
            </Typography>
            <Box>
              <Button color="inherit" href="/">
                Home
              </Button>
              <Button color="inherit" href="/shop">
                Shop
              </Button>
              <Button color="inherit" href="/about">
                About
              </Button>
            </Box>
            <IconButton color="inherit" href="/cart">
              <Badge badgeContent={4} max={10} color="warning">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        </CssBaseline>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
