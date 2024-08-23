// not in use
import React, { useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use useNavigate
import { auth } from '../firebase'; // Adjust path as needed
import { signOut } from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#1E1E1E"
      fontFamily="'Roboto', sans-serif"
    >
      <Typography variant="h4" color="#FFFFFF" mb={2}>
        Welcome to the Home Page!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{
          bgcolor: '#00FF00', 
          color: '#000000',
          borderRadius: 8,
          '&:hover': {
            bgcolor: '#32CD32', 
          },
          transition: 'background-color 0.3s ease',
        }}
      >
        Log Off
      </Button>
    </Box>
  );
};

export default Home;