import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { logoutUser } from '../../redux/slices/UserSlice';

const Anynomous = () => {
  return (
    <>
      <MenuItem sx={{ p: 0, marginX: '1rem' }}>
        <Button
          variant="contained"
          component="a"
          href="/login"
          target="_blank"
          sx={{ width: '100%' }}
        >
          Sign in
        </Button>
      </MenuItem>
      <MenuItem sx={{ p: 0, marginX: '1rem' }}>
        <Button
          color="inherit"
          variant="text"
          component="a"
          href="/signup"
          target="_blank"
          sx={{ width: '100%' }}
        >
          Sign up
        </Button>
      </MenuItem>
    </>
  );
};

const User = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Đức Anh" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="name" disabled>
          <Typography textAlign="center">Tran Duc Anh</Typography>
        </MenuItem>
        <Divider />
        <MenuItem key="profile" disabled>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem key="logout" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

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
            <Box display="flex" alignItems="center">
              <img src="./src/assets/images/book.png" alt="logo" width={50} />
              <Typography variant="h6" component="div">
                BookWorm
              </Typography>
            </Box>
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
            <Box sx={{ display: 'flex', gap: '2rem' }}>
              <IconButton color="inherit" href="/cart">
                <Badge badgeContent={4} max={10} color="warning">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <User />
            </Box>
          </Toolbar>
        </CssBaseline>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
