import React,{useState} from 'react'
import { DatePicker,Select,Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import moment from "moment"
import {useHistory} from 'react-router-dom'

const {RangePicker}=DatePicker
const {Option}=Select
const {Search:Serachnew}=Input

const Search=()=>{
    const[location,setLocation]=useState("")
    const[date,setDate]=useState('')
    const[bed,setBed]=useState("")
    const history=useHistory()
    const handleSubmit=()=>{
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }
    const handleChange=(e)=>{
        e.prevenrDefault()
        setLocation(location)
    }
    return (
        <div className="d-flex pb-4">
         
          <Input
   type="text" 
   name="location"
   value={location}
   style={{width:'100%',height:"50px "}}
   placeholder='Enter your location of the hotel'
   className="form-control mr-1 w-100 "
    onChange={(e)=>setLocation(e.target.value)}
    />
         
    
          <RangePicker
            onChange={(value, dateString) => setDate(dateString)}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
            className="w-100 mr-20"
          />
    
          <Select
            onChange={(value) => setBed(value)}
            className="w-100"
            size="large"
            placeholder="Number of beds"
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
    
          <SearchOutlined
            onClick={handleSubmit}
            className="btn btn-primary p-3 btn-square"
          />
        </div>
      );
}

export default Search

{/* <input
   type="text" 
   name="location"
   value={location}
   placeholder='Enter your location of the hotel'
   className="form-control m-2 w-100 "
    onChange={(e)=>setLocation(e.target.value)}

    /> */}
