let { expressjwt: jwt } = require("express-jwt");
const Hotel = require( '../models/hotels')
const requireSignin = jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })

const hotelOwner=async(req,res,next)=>{
    let hotel=await Hotel.findById(req.params.hotelId).exec()
    let owner=hotel.postedBy._id == req.auth._id
    if(!owner){
        return res.status(403).send('Unauthorized')
    }
    next()
}
module.exports={requireSignin,hotelOwner}