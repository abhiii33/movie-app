import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { addtoCart } from '../../store/cartslice'
import Category from '../Category'
import { Link } from 'react-router-dom'
const Product = () => {
   const dispatch = useDispatch()
    const[data,setData]= useState([])
    const[search,setSearch] = useState("")
    const [loading,setLoading] = useState(true);
    const url = "https://dummyjson.com/products?sortBy=title&order=asc"
    useEffect(() => {
             const get = async()=>{
                 try{
                 const pro = await axios.get(url)
                setData(pro.data.products.slice(0,20))
                console.log(pro.data.products);
             setLoading(false)
              }
          catch (error) {
              console.log("error",error);
          }
        }
         get()
    }, [])
  ///////////////////
  const[third,setThird]= useState([])
    const urll = "https://dummyjson.com/products/categories"
    useEffect(() => {
     const gett = async()=>{
     try {
        const cat = await axios.get(urll)
        console.log(cat.data);
        setThird(cat.data)
        console.log("cat",cat.data);
        setLoading(false)
     } catch (error) {
        console.log("error",error);
     }
  } 
  gett()
 }, [])

 const handleClick = async(category) => {
  
    try {
      if(category === " "){
        const pro = await axios.get(url)
        setData(pro.data.products.slice(0,20))
        setLoading(false)
      }
      else{
      const choosen = await axios.get(`https://dummyjson.com/products/category/${category}`)
      setData(choosen.data.products)
      console.log(choosen.data.products);
      setLoading(false)
    }
    } 
    catch(error) 
    {
      console.log("error",error);
    }
}

const add = (item)=>{
  console.log(item);
  dispatch(addtoCart(item)) 
}
    const handleSearch = (search)=>{
  setSearch(search)
   data.filter((item) => { 
   return item.title.toLowerCase().includes(search.toLowerCase())
  })
    }

    const itemsperpage =10;
    const noofpage = Math.ceil(data.length / itemsperpage);
    const pages = Array.from({ length: noofpage }, (_, index) => index + 1);  
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsperpage;
    const endIndex = startIndex + itemsperpage; 
    const currentItems = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);   
  }
  return (
    <div>
      <label htmlFor="search">search any product</label>
      <br/>
     <input type="text" id="search" placeholder="search" value={search} 
    onChange = {(e)=>{setSearch(e.target.value)}} />
      <button onClick={()=>{handleSearch(search)}}>Search</button>
      <nav>
     <h1>category nav</h1>
     {loading && <h1>Loading...</h1>}
     {third.map((item,index)=>{
      return <div key={index}>
          <ul>
            
            <li onClick={()=>{handleClick(item.slug)}}>{item.name}</li>       
          </ul>
     </div>
     })}
  </nav>
   {loading && <h1>Loading...</h1>}
{data.map((item,index)=>{
    return <div key={index} className="bg-zinc-400">
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <img src={item.thumbnail} alt= "" />
        <button onClick={()=>{add(item)}}>ADD TO CART </button>
    </div>
})}

    </div>
  )
}

export default Product
