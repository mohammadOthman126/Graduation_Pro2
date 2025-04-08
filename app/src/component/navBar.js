import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style/navBar.css';

export default function ButtonAppBar() {
    
  return (
    <Box sx={{ flexGrow: 1 }} className="navbar-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
          <Button  color="inherit"  component={Link}  to="/"  sx={{ mx: 2 }}   className="navbar-button"> Home   </Button>
          <Button  color="inherit"  component={Link}  to="/hello"  sx={{ mx: 2 }}   className="navbar-button"> News   </Button>
        </Box>

          <Button color="inherit" component={Link}  to="/login"  className="navbar-button">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
