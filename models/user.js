const {Schema, model} = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    profileImageUrl: {
        type: String,
        default: './images/default.png',
    }
},{ timestamps: true});

userSchema.pre('save', function(next){
    try {
        const user = this;
        if(!user.isModified("password")) return;
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac("sha256", salt).update(user.password).digest('hex');
        this.salt = salt;
        this.password = hashedPassword;
        next;
    } catch (error) {
        console.log(error);
        
    }
   

});

userSchema.static('matchPassword', async function (email, password) {
try{
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found ");
    const salt = user.salt;
    const userProvidedHash =  createHmac("sha256", salt).update(password).digest('hex');
    if(userProvidedHash !== user.password) throw new Error("Password is incorrect");

    return user;
}catch(e){
    console.log(e);
    
}
})
const User = model("user", userSchema);
module.exports = User;