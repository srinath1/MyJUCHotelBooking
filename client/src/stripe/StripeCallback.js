import {LoadingOutlined} from '@ant-design/icons'
import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getAccountStatus} from '../actions/stripe'
import {updateUserInLocalStorage} from '../actions/auth'

const StripeCallback=({history})=>{
    const {auth}=useSelector(state=>({...state}))
    const dispatch=useDispatch()

    const accountStatus=async()=>{
        try{
            const response=await getAccountStatus(auth.token)
            updateUserInLocalStorage(response.data,()=>{
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload:response.data
                })
            })
            window.location.href='/dashboard/seller'

        }catch(err){
            console.log(err)

        }
    }

    useEffect(()=>{
        if(auth && auth.token)  accountStatus()

        
    },[auth])

    
    return <div className='d-flex justify-content-center p-5'>

        <LoadingOutlined className='display-1 p-5 text-danger'/>
    </div>




}

export default StripeCallback