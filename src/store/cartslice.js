import {createSlice} from "@reduxjs/toolkit";
const cartslice = createSlice({
    name:"cart",
    initialState:{
        cartitem:[],
        Totalquantity:0,
    },
    reducers:{
       addtoCart:(state,action)=>{
       const exist = state.cartitem.find((item)=> item.id === action.payload.id)
       if(exist){
        exist.quantity += 1
            console.log("exist",exist);
            return
       }
          const newcart = {
            id:action.payload.id,
            title:action.payload.title,
            price:action.payload.price,
            thumbnail:action.payload.thumbnail,
            quantity:1
          }
          state.cartitem.push(newcart)
          console.log(newcart);
          console.log("state",state.cartitem);
          
       },
       incrementQuantity:(state,action)=>{
            state.cartitem = state.cartitem.map((item)=>{   
           if(item.id === action.payload)
            {
                 return  {...item,quantity:item.quantity +1}   
             }
             return item
            })
       } ,
       decrementQuantity:(state,action)=>{
            state.cartitem = state.cartitem.map((item)=>{
                if(item.id === action.payload){
                    return {...item,quantity:item.quantity -1 } 
                }
        
                return item 
            })   
                 state.cartitem = state.cartitem.filter((item)=> item.quantity > 0)
       }  
    }
})

export const {addtoCart, incrementQuantity ,decrementQuantity} = cartslice.actions
export default cartslice.reducer