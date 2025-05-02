const UserModel=require('../models/userModel');
const jwt=require('jsonwebtoken');

const JWT_SECRET=process.env.JWT_SECRET;
const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET;

const register= async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use.' });
        }
        const user=await UserModel({username,email,password});
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

const login= async (req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(!user){
        return res.status(404).json({message:'User Not Found'});
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch){
          return  res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
         res.status(200).json({message:'Login successful',token, user: {id: user._id,username: user.username,email:user.email}});
    } catch (error) {
        res.status(500).json({message:error});
    }
}
const updateProfile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const { username, email } = req.body;
  
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
  
      res.status(200).json({ user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
  };
  
const changePassword = async (req, res) => {
  const userId = req.user.id; // تم استخلاصه من الـ middleware
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    // تحديث كلمة المرور
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports={register,login,updateProfile,changePassword,deleteAccount};