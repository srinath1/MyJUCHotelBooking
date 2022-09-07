import React,{useEffect,useState} from 'react'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import Search from '../Components/forms/Search'
import {searchListings} from '../actions/hotel'
import SmallCard from '../Components/cards/SmallCard'

const SearchHotels = () => {
    const[searchLocation,setSearchLocation]=useState('')
    const[searchDate,setSearchDate]=useState('')
    const[serachBed,setSerachBed]=useState('')
    const[hotels,setHotels]=useState([])
    useEffect(()=>{
        const {location,date,bed}=queryString.parse(window.location.search)
        console.table(location,date,bed)
        searchListings({location,date,bed}).then(res=>{
            console.log(res.data)
           if(res.data) setHotels(res.data)
        })

    },[window.location.search])
  return (
    <>
    <div className='col'>
        <br />
        <Search/>
    </div>
    <div className='container'>
        <div className='row'>
        {hotels && hotels.map(h=>{
           return <SmallCard key={h._id} h={h}/>
        })}
        </div>

    </div>
    </>
  )
}

export default SearchHotels