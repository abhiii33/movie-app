"use client"

import {useState} from "react"
export default function Landing (){
    const [add,setAdd]= useState(0)
//    console.log(setAdd(prev=>prev+1))
    
    return (
        <>
        <h1>{add}</h1>
        </>
    )
}