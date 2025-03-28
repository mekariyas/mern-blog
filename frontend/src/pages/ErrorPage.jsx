import React from 'react';
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
    <h1 className="w-full text-lg md:text-xl font-bold text-center">404 not found</h1>
    <div className="w-full h-30 flex items-center justify-center">
    <button onClick={()=>{
        navigate(-1)
    }} className="w-28 h-10 bg-blue-700 rounded-md text-white text-lg md:text-xl font-bold cursor-pointer">Go back</button>
    </div>
    </div>
  )
}

export default ErrorPage