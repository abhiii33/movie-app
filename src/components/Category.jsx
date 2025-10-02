import React from 'react'
import { useEffect, useState,useHook } from 'react'
import axios from 'axios'
const Category = () => {
    const[third,setThird]= useState([])
    const url = "https://dummyjson.com/products/categories"
   
    useEffect(() => {
     const get = async()=>{
     try {
        const cat = await axios.get(url)
        console.log(cat.data);
        setThird(cat.data)
        console.log("cat",cat.data);
     } catch (error) {
        console.log("error",error);
     }
  } 
  get()
 }, [])
    
  return (
    <div>
      {third.map((item,index)=>{
        return <div key={index} className="bg-zinc-400">
            <h1>{item.name}</h1>
        </div>
      })}
    </div>
  )
}

export default Category
