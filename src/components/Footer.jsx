import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Footer = () => {
  const { register, handleSubmit,reset } = useForm();
  const [data, setData] = useState([]);
  const api = "http://localhost:8080/user";
  const get = async () => {
    try {
      const res = await axios.get(api);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  get();
  const submit = async(data)=>{
   return  await axios.post("http://localhost:5173/comment/",data)
    reset()
  }
  return (
    <>
      <div>
        {data.map((item, index) => {
          return <div key={index}>{item.name}</div>;
        })}
      </div>
      <form action="" onSubmit={handleSubmit(submit)}>
      <input type="text" label="email" {...register("email",{required:true})}/>
        <input type="text" label="name" {...register("name",{required:true})}/>
          <input type="text" label="comment" {...register("comment",{required:true})}/>
           
            <button >submit</button>
      </form>
    </>
  );
};

export default Footer;
