import axios from 'axios'
export const createHotel=async(token,data)=>{
   return await axios.post('https://myjuchotelbooking.herokuapp.com/create-hotel',data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
}

export const allHotels=async()=>{
   return await axios.get(`https://myjuchotelbooking.herokuapp.com/hotels`)
}

export const diffDays=(from,to)=>{
    const day=24*60*60*1000
    const start=new Date(from)
    console.log('From',start)
    const end=new Date(to)
    console.log('To',end)
    const difference=Math.round(Math.abs((start-end)/day))
    console.log('Difference',difference)
    return difference
}
export const sellerHotels=async(token)=>{
    return await axios.get(https://myjuchotelbooking.herokuapp.com/seller-hotels`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const deleteHotel=async(token,hotelId)=>await axios.delete(`https://myjuchotelbooking.herokuapp.com/delete-hotel/${hotelId}`,{

    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const read=async(hotelId)=>{
   return await axios.get(`https://myjuchotelbooking.herokuapp.com//hotel/${hotelId}`)
}

export const updateHotel = async (token, data, hotelId) =>
await axios.put(
  `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

export const userHotelBookings=async(token)=>await axios.get(`https://myjuchotelbooking.herokuapp.com/user-hotel-bookings`,{
    
        headers: {
          Authorization: `Bearer ${token}`,
        }
      
})
export const isAlreadyBooked=async(token,hotelId)=>await axios.get(`https://myjuchotelbooking.herokuapp.com/is-already-booked/${hotelId}`,{
    
  headers: {
    Authorization: `Bearer ${token}`,
  }

})


export const searchListings=async(query)=>await axios.post(`https://myjuchotelbooking.herokuapp.com/search-listings`,query)
