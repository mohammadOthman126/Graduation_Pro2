import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, Divider, Link } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Username is required.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ لو التسجيل تمام
          toast.success('Registered Successfully! 🎉');

          setEmail('');
          setPassword('');
          setUsername('');
          setEmailError('');
          setPasswordError('');
          setUsernameError('');
          
          // لو السيرفر رجع توكن بنحفظه
          if (data.token) {
            localStorage.setItem('token', data.token);
          }

          // التوجيه لصفحة تسجيل الدخول بعد النجاح
          setTimeout(() => {
            window.location.href = '/login'; // سيتم نقلك لصفحة login بعد التسجيل
          }, 3000); // تأخير 2 ثانية عشان المستخدم يقدر يشوف الرسالة

        } else {
          // ❌ لو الإيميل موجود
          toast.error(data.message || 'Registration failed!');
          // إفراغ الخانات وإعادة تحميل الصفحة
          setEmail('');
          setPassword('');
          setUsername('');
          setEmailError('');
          setPasswordError('');
          setUsernameError('');
          
          // إعادة تحميل الصفحة (يمكنك استبدال ذلك بتصفير الخانات فقط لو تفضل)
          setTimeout(() => {
            window.location.reload(); // إعادة تحميل الصفحة
          }, 1500); // تأخير صغير قبل التحديث
        }
      } catch (error) {
        toast.error('Something went wrong!');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 2 }}>
      <ToastContainer position="top-center" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, width: '100%', padding: 3, borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(usernameError)}
            helperText={usernameError}
            fullWidth
            required
          />
        </FormControl>

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
