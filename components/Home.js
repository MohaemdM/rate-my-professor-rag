import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

const Home = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'linear-gradient(135deg, #0066FF, #0099FF, #00CCFF)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 3.5s ease infinite',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        color={isDarkMode ? '#000000' : '#FFFFFF'}
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          mb: 1,
        }}
      >
        Welcome To
      </Typography>
      <Typography
        variant="h2"
        color={isDarkMode ? '#000000' : '#FFFFFF'}
        sx={{
          fontSize: { xs: '2.5rem', md: '4rem' },
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Rate My Professor Assistant
      </Typography>
      <Typography
        variant="h5"
        color={isDarkMode ? '#000000' : '#FFFFFF'}
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          maxWidth: '90%', // Adjusted to fit better on smaller screens
          mx: 'auto',
          mb: 3,
        }}
      >
        Your AI assistant for evaluating professors and enhancing your academic experience.
      </Typography>
      <Typography
        variant="body1"
        color={isDarkMode ? '#333333' : '#CCCCCC'}
        sx={{
          fontSize: { xs: '1rem', md: '1.25rem' },
          maxWidth: '90%', // Adjusted to fit better on smaller screens
          mx: 'auto',
          mb: 4,
        }}
      >
        Discover insights and reviews to make informed decisions about your professors. Get started now to explore the features and tools we offer.
      </Typography>
      <Link href="/signup" passHref>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: isDarkMode ? '#000000' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#000000',
            borderRadius: '8px',
            padding: '12px 24px',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: isDarkMode ? '#333333' : '#F0F0F0',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          Get Started
        </Button>
      </Link>
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  );
};

export default Home;