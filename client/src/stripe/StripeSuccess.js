import React,{useEffect,useState} from "react";
import {useSelector} from 'react-redux'
import {stripeSuccessRequest} from '../actions/stripe'
import {LoadingOutlined} from '@ant-design/icons'

const StripeSuccess = ({match,history}) => {
  const {auth:{token}}=useSelector(state=>({...state}))

  useEffect(()=>{
    stripeSuccessRequest(token,match.params.hotelId).then(res=>{
      if(res.data.success){
        console.log(res.data)
    history.push('/dashboard')
      }else{
        history.push('/stripe/cancel')
      }
      })
    

  },[match.params.hotelid])
  return (
    <div className="container">
      <div className="col d-flex justify-content-center p-5">
          <LoadingOutlined className='display-1 text-danger'/>
      </div>
    </div>
  );
};

export default StripeSuccess;
