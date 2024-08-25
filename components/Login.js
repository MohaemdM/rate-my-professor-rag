import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user.emailVerified) {
        localStorage.setItem('token', user.accessToken);
        router.push('/'); // Redirect to root path, which _app.js will handle
      } else {
        setError('Please verify your email before logging in.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
      p={2}
    >
      <Stack
        direction="column"
        width="100%"
        maxWidth="500px"
        height="auto"
        maxHeight="700px"
        bgcolor="background.paper"
        borderRadius={4}
        boxShadow={3}
        p={3}
        spacing={3}
      >
        <Typography variant="h5" color="text.primary" textAlign="center">
          LogIn
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            mt: 2,
            borderRadius: 4,
            '&:hover': {
              bgcolor: '#00FFFF',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          LogIn
        </Button>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.primary" textAlign="center">
            Do not have an account?{' '}
            <Link href="/signup" passHref>
              <Button variant="text" color="secondary">Sign Up</Button>
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;