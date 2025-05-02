const express=require('express');
const router=express.Router();

const {login,register,updateProfile,changePassword,deleteAccount}=require('../controllers/userController');
const protect=require('../controllers/authMiddleWare');

router.post('/register',register);
router.post('/login',login);
router.put('/update', updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/delete', protect, deleteAccount);

module.exports=router;