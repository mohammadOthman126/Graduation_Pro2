const mongose=require('mongoose');
const bcrypt=require('bcrypt');
const { default: mongoose } = require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})
UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
UserSchema.methods.matchPassword=async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)    
}
module.exports=mongoose.model('AuthUser',UserSchema);