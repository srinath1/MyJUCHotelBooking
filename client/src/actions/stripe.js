import axios from "axios";

export const createConnectAccount = async (token) =>
  await axios.post(
    `https://myjuchotelbooking.herokuapp.com/api/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountStatus = async (token) =>
  axios.post(
    `https://myjuchotelbooking.herokuapp.com/api/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  export const getAccountBalance = async (token) =>
  axios.post(
    `https://myjuchotelbooking.herokuapp.com/api/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  export const currencyFormatter=(data)=>{
    return(data.amount/100).toLocaleString(data.currency,{
      style:'currency',
      currency:data.currency
    })
  }

  export const payoutSettings=async(token)=>await axios.post(`https://myjuchotelbooking.herokuapp.com/api/payout-setting`,{},{
    headers: {
      Authorization: `Bearer ${token}`,
    },

  })
  export const getSessionId=async(token,hotelId)=>await axios.post( `https://myjuchotelbooking.herokuapp.com/api/stripe-session-id`,
{hotelId},
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

)

export const stripeSuccessRequest=async(token,hotelId)=>{
  return axios.post(`https://myjuchotelbooking.herokuapp.com/api/stripe-success`,{
    hotelId,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
