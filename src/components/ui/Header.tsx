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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUser } from '../../redux/slices/UserSlice';
import { User } from '../../types/User';
import axios from 'axios';

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

const Customer = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/auth/logout')
      .then(() => {
        dispatch(logoutUser());
        window.location.reload();
      })
      .catch(() => {
        dispatch(logoutUser());
        window.location.reload();
      });
  };

  return (
    <Box sx={{ flexGrow: 0, ml: '1rem' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={name} src="" />
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
          <Typography textAlign="center">{name}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem key="profile" disabled>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem key="logout" onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

function Header() {
  const user = useAppSelector((state) => state.user.user as User | null);
  const cartInfo = useAppSelector((state) => state.cart);

  const name = user ? user.first_name + ' ' + user.last_name : 'Guest';
  const isLoggedIn = user !== null;
  const cart = cartInfo ? cartInfo.items.length : 0;
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
            <Box display="flex" alignItems="center" component={'a'} href="/">
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
            <Box sx={{ display: 'flex' }}>
              <IconButton color="inherit" href="/cart">
                <Badge badgeContent={cart} max={10} color="warning">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {isLoggedIn ? <Customer name={name} /> : <Anynomous />}
            </Box>
          </Toolbar>
        </CssBaseline>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
