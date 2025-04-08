import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, Divider, Link } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';


const Register = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // التحقق من الاسم
    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    // التحقق من البريد الإلكتروني
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // التحقق من كلمة المرور
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // هنا يمكنك إضافة كود لرفع البيانات إلى الخادم (مثل API أو Firebase)
      console.log({ name, email, password });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, width: '100%', padding: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        {/* اسم المستخدم */}
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="name">Full Name</FormLabel>
          <TextField
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(nameError)}
            helperText={nameError}
            fullWidth
            required
          />
        </FormControl>

        {/* البريد الإلكتروني */}
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <TextField
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
            fullWidth
            required
          />
        </FormControl>

        {/* كلمة المرور */}
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            fullWidth
            required
          />
        </FormControl>

        {/* زر التسجيل */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Sign Up
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            or
          </Typography>
        </Divider>

        {/* التسجيل باستخدام حسابات خارجية */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Google />}
          sx={{ marginBottom: 1 }}
          onClick={() => alert('Sign up with Google')}
        >
          Sign up with Google
        </Button>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<Facebook />}
          onClick={() => alert('Sign up with Facebook')}
        >
          Sign up with Facebook
        </Button>

        {/* رابط لتسجيل الدخول إذا كان المستخدم لديه حساب */}
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link href="/login" color="primary">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
