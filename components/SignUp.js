import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import Link from 'next/link';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(firestore, 'users', user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
      });

      alert('User signed up successfully! Please verify your email.');
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
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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
          onClick={handleSignUp}
          sx={{
            mt: 2,
            bgcolor: '#00BFFF',
            color: '#000000',
            borderRadius: 4,
            '&:hover': {
              bgcolor: '#00FFFF',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          Sign Up
        </Button>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.primary" textAlign="center">
            Already have an account?{' '}
            <Link href="/login" passHref>
              <Button variant="text" color="secondary">Log in</Button>
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SignUp;