const User=require('../models/user')
const jwt=require('jsonwebtoken')
const register=async(req,res)=>{
   console.log(req.body)

   
   try{
      const {name,email,password}=req.body
   if(!name ) return res.status(400).send('name is required')
   if(!password || password<6){
      return res.status(400).send('Password id required & should be atleast 6 characters')

   }
   let userExist=await User.findOne({email}).exec()
   if (userExist)  return res.status(400).send('Email is taken')
   const user=new User(req.body)
      await user.save()
      console.log(user)
      return res.json({ok:true})
   }catch(err){
      console.log(err)
      return res.status(400).send('Error try again')
   }
}

const login=async(req,res)=>{
   const {email,password}=req.body
   try{
      let user=await User.findOne({email}).exec()
      if(!user) return res.status(400).send('User with email not found')
      user.comparePassword(password,(err,match)=>{
         if(!match || err) return res.status(400).send('Wrong Password')
         console.log('Generate token')
         let token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'15d'
         })
         res.json({user:{
            name:user.name,
            email:user.email,
            _id:user._id,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            stripe_account_id:user.stripe_account_id,
            stripe_seller:user.stripe_seller,
            stripeSession:user.stripeSession
         },token})

      })

   }catch(err){
      res.status(400).send('Signin failed')
   }
}

module.exports={register,login}