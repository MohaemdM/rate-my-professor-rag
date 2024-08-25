import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link'; // Import Link from next/link

const Home = () => {
  const theme = useTheme(); // Get the current theme

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.default} // Use theme background color
      p={2}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={3}
        bgcolor={theme.palette.background.paper} // Use theme paper color
        borderRadius={2}
        boxShadow={2}
        p={3}
        maxWidth="600px"
        width="100%"
        textAlign="center"
      >
        <Typography variant="h2" color={theme.palette.primary.main}>
          Welcome to Rate My Professor AI Support
        </Typography>
        <Typography variant="h6" color={theme.palette.text.primary}>
          Your personalized AI assistant for evaluating professors and enhancing your academic experience.
        </Typography>
        <Typography variant="body1" color={theme.palette.text.secondary} paragraph>
          Discover insights and reviews to make informed decisions about your professors. Get started now to explore the features and tools we offer.
        </Typography>
        <Link href="/signup" passHref>
  <Button
    variant="contained"
    color="primary"
    sx={{
      mt: 2,
      bgcolor: '#00BFFF', // Blue button
      color: '#000000',
      borderRadius: 4,
      '&:hover': {
        bgcolor: '#00FFFF', // Lighter blue on hover
      },
      transition: 'background-color 0.3s ease',
    }}
  >
    Get Started
  </Button>
</Link>
      </Stack>
      
    </Box>
  );
};

export default Home;