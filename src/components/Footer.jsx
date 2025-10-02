import React from 'react'
import{useSelector,useDispatch} from "react-redux"
import {incrementQuantity,decrementQuantity} from '../store/cartslice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  const dispatch = useDispatch()
  const inc=(id)=>{
    dispatch(incrementQuantity(id))
  }
  const dec= (id)=>{
         dispatch(decrementQuantity(id))
  }
  const rating = Array.from({length:5},(star,index)=>{
    return <FontAwesomeIcon icon ={faStar} key={index} />
        
  })
  const cart = useSelector((state)=> state.cart.cartitem)
  const q = useSelector((state)=> state.cart.Totalquantity)
  return (
    <div>
      <h1>cary section</h1>
     <h2>{rating}</h2> 
      {
        cart.map((item,index)=>{
            // console.log(item.title);
           return <div key={index}>
                  <h3>{item.title}</h3>
                  <span>Price:{item.price}</span>
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="quantity bg-zinc-600 box">
                      <button onClick={()=>{inc(item.id)}} >+</button>
                       <span>{item.quantity}</span> 
                      <button onClick={()=>{dec(item.id)}}>-</button>
                      <span>Total:{item.price*item.quantity}</span>
                  </div>
               
                </div> 
        })
      }
      
    </div>
  )
}

export default Footer
