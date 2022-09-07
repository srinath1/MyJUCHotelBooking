 const User=require('../models/user')
 const Stripe=require('stripe')
 const Hotel=require('../models/hotels')
 const Order=require('../models/order')


 const queryString=require('query-string')
 const stripe = Stripe(process.env.STRIPE_SECRET);

  const createConnectAccount = async (req, res) => {
   // 1. find user from db
   const user = await User.findById(req.auth._id).exec();
   console.log("USER ==> ", user);
   // 2. if user don't have stripe_account_id yet, create now
   if (!user.stripe_account_id) {
     const account = await stripe.accounts.create({
       type: "express",
     });
     console.log("ACCOUNT ===> ", account);
     user.stripe_account_id = account.id;
     user.save();
   }
   // 3. create login link based on account id (for frontend to complete onboarding)
   let accountLink = await stripe.accountLinks.create({
     account: user.stripe_account_id,
     refresh_url: process.env.STRIPE_REDIRECT_URL,
     return_url: process.env.STRIPE_REDIRECT_URL,
     type: "account_onboarding",
   });
   // prefill any info such as email
   accountLink = Object.assign(accountLink, {
     "stripe_user[email]": user.email || undefined,
   });
   // console.log("ACCOUNT LINK", accountLink);
   let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
   console.log("LOGIN LINK", link);
   res.send(link)
   // 4. update payment schedule (optional. default is 2 days
 };

 const updateDelayDays=async(accountId)=>{
  const account=await stripe.accounts.update(accountId,{
    settings:{
      payouts:{
        schedule:{
          delay_days:7

        }
      }
    }
  })
  return account
 }

 const getAccountStatus=async(req,res)=>{
  console.log('get account status')
  const user=await User.findById(req.auth._id).exec()
  const account=await stripe.accounts.retrieve(user.stripe_account_id)
  const updatedAccount=await updateDelayDays(account.id)
  //console.log(account)

  const updatedUser=await User.findByIdAndUpdate(user._id,{
    stripe_seller:updatedAccount
  },{new:true}).select('-password').exec()
  res.json(updatedUser)

 }
 const getAccountBalance=async(req,res)=>{
  const user=await User.findById(req.auth._id).exec()

  try{
    const balance=await stripe.balance.retrieve({
      stripeAccount:user.stripe_account_id,

    })
    console.log('Balance',balance)
    res.json(balance)

  }catch(err){
    console.log(err)
  }
}



  const payoutSetting=async(req,res)=>{
    try{
      const user=await User.findById(req.auth._id).exec()
      const loginLink=await stripe.accounts.createLoginLink(user.stripe_seller.id,{
        redirect_url:process.env.TRIPE_SETTINGS_REDIRECT_URL

      })
      console.log('Payout login link',loginLink)
      res.json(loginLink)



    }catch(err){
      console.log('Stripe payout setting',err)
    }

  }
   const stripeSessionId=async(req,res)=>{

    const {hotelId}=req.body;
    const item=await Hotel.findById(hotelId).populate('postedBy').exec()
    const fee=(item.price*20)/100

    const session=await stripe.checkout.sessions.create({
      payment_method_types:['card'],
    line_items:[
      {
        name:item.title,
        currency:'dkk',
        amount:item.price*100,
        quantity:1

      }
    ],
    payment_intent_data:{
      application_fee_amount:fee*100,
      transfer_data:{
        destination:item.postedBy.stripe_account_id
      }
    },
    success_url:`${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url:process.env.STRIPE_CANCEL_URL


    })
    console.log('Session',session)

    await User.findByIdAndUpdate(req.auth._id,{stripeSession:session}).exec()
    const testing=User.findById(req.auth._id)
    console.log('user',testing.stripeSession)
    res.send({
      sessionId:session.id
    })


    

  }

  const stripeSuccess=async(req,res)=>{

    try{
      const {hotelId}=req.body
    const user=await User.findById(req.auth._id).exec()
    const session=await stripe.checkout.sessions.retrieve(user.stripeSession.id)
    if(!user.stripeSession) return
    if(session.payment_status==='paid'){
      const orderExist=await Order.findOne({'session.id':session.id}).exec()
      if(orderExist){
        res.json({success:true})
      }else{
        let newOrder=await new Order({
          hotel:hotelId,
          session,
          orderedBy:req.auth._id
        }).save()
        await User.findByIdAndUpdate(user._id,{
          $set:{stripeSession:{}}
        })
        res.json({success:true})
      }
    }
    }catch(err){
      console.log(err)
    }

  }
 

module.exports={createConnectAccount,getAccountStatus,getAccountBalance,payoutSetting,stripeSessionId,stripeSuccess}