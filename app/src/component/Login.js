import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel, Divider, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // استبدل useHistory بـ useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory

  const validateForm = () => {
    let isValid = true;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('Login response data:', data);


        if (!response.ok) {
          setErrorMessage(data.message || 'Login failed, please try again');
        } else {
          // في حال نجاح عملية الدخول، يمكنك تخزين التوكن أو إجراء ما تريد
          localStorage.setItem('authToken', data.token); // إذا كنت تستخدم JWT
          localStorage.setItem('userData', JSON.stringify(data.user));
          navigate('/'); // أو الصفحة الرئيسية بعد تسجيل الدخول
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again later.');
      }
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
          Login
        </Typography>

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

        {/* رسالة الخطأ */}
        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {/* زر تسجيل الدخول */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        <Divider sx={{ my: 2 }} />

        {/* رابط لتسجيل مستخدم جديد */}
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" color="primary">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
