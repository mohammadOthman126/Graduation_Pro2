import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button,
  Avatar, Divider, Alert, Collapse, Dialog,
  DialogTitle, DialogContent, DialogContentText,
  DialogActions, IconButton
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const storedUser = JSON.parse(localStorage.getItem('userData')) || {};
  const [username, setUsername] = useState(storedUser.username || '');
  const [email, setEmail] = useState(storedUser.email || '');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');

  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [showDeleteAlert, setShowDeleteAlert] = useState(true);

  const [openConfirm, setOpenConfirm] = useState(false);

  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      localStorage.setItem('userData', JSON.stringify(data.user));
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Password update failed');
      setPwSuccess('Password changed successfully!');
      setPwError('');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setPwError(err.message);
      setPwSuccess('');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');

      setDeleteSuccess('Account deleted successfully. Redirecting...');
      setDeleteError('');
      setShowDeleteAlert(true);

      setTimeout(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/login');
      }, 4000);

    } catch (err) {
      setDeleteError(err.message || 'Failed to delete account.');
      setDeleteSuccess('');
      setShowDeleteAlert(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 72, height: 72, mx: 'auto', mb: 1 }}>
            {username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="h5">My Account</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account info and password
          </Typography>
        </Box>

        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleUpdateProfile}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Save Changes</Button>
        </form>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>Change Password</Typography>
        {pwSuccess && <Alert severity="success" sx={{ mb: 2 }}>{pwSuccess}</Alert>}
        {pwError && <Alert severity="error" sx={{ mb: 2 }}>{pwError}</Alert>}

        <form onSubmit={handleChangePassword}>
          <TextField label="Current Password" fullWidth margin="normal" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          <TextField label="New Password" fullWidth margin="normal" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Button variant="outlined" type="submit" fullWidth sx={{ mt: 2 }}>Change Password</Button>
        </form>

        <Divider sx={{ my: 4 }} />

        <Collapse in={showDeleteAlert && (deleteSuccess || deleteError)}>
          {deleteSuccess && (
            <Alert
              severity="success"
              action={
                <IconButton size="small" onClick={() => setShowDeleteAlert(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {deleteSuccess}
            </Alert>
          )}
          {deleteError && (
            <Alert
              severity="error"
              action={
                <IconButton size="small" onClick={() => setShowDeleteAlert(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {deleteError}
            </Alert>
          )}
        </Collapse>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button color="error" variant="outlined" onClick={() => setOpenConfirm(true)}>
            Delete Account
          </Button>
        </Box>

        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will permanently delete your account. This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
            <Button onClick={handleDeleteAccount} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Account;
