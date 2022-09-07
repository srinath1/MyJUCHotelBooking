const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const {Schema}=mongoose

const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:'Name is requires'
    },
    email:{
        type:String,
        trim:true,
        required:'Email is requires',
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:64
    },
    stripe_account_id:'',
    stripe_seller:{},
    stripeSession:{}
},
{timestamps:true})
userSchema.pre('save',function(next){
    let user=this
    if(user.isModified('password')){
        return bcrypt.hash(user.password,12,function(err,hash){
            if(err){
                console.log(err)
                return next(err)
            }
            user.password=hash
            return next()

        })
    }else{
        return next()
    }
    
})

userSchema.methods.comparePassword=function(password,next){
    bcrypt.compare(password,this.password,function(err,match){
        if(err){
            console.log('Compare password err',err)
            return next(err,false)
        }
        console.log('Match Password',match)
        return next(null,match)
    })

}

module.exports= mongoose.model('User',userSchema)