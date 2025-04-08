import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';

// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const signIn = async (provider, formData) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
      );
      resolve();
    }, 300);
  });
  return promise;
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignIn = (provider, formData) => {
    signIn(provider, formData).then(() => {
      // بعد عرض alert، نقوم بالتوجيه إلى الصفحة الرئيسية
      navigate('/');
    });
  };

  return (
    // preview-start
    
    <AppProvider theme={theme}>
        
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
     <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
              Already have an account?{' '}
              <Link href="/register" color="primary">
                Sign Up
              </Link>
            </Typography>
    </AppProvider>
    // preview-end
    

  );
}
