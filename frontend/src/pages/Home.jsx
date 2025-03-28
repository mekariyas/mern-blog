import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center  gap-2">
        <div className="w-[35%] h-[20%] md:h-[35%] bg-linear-to-tr from-blue-800 to-blue-300 flex flex-col justify-center items-center gap-2 rounded-md text-white">
            <h1 className="w-full h-3 text-center text-xl font-semiBold md:font-bold ">MERN Stack</h1>
            <h2 className="w-full h-3 text-center">Blog-App</h2>
        </div>
        <div className="w-[35%] md:w-[35%] h-[15%] gap-3 flex flex-col justify-around items-center md:flex-row md:justify-around md:items-center ">
            <Link to="/signUp" className='w-[80%] h-[30%] md:w-[30%] md:h-[45%] bg-slate-600 rounded-md text-center font-medium md:font-bold text-white p-2'>Sign up</Link>
            <Link to="/logIn" className='w-[80%] h-[30%] md:w-[30%] md:h-[45%] bg-blue-600 rounded-md text-center font-medium md:font-bold text-white p-2'>Log in</Link>
        </div>
    </div>
  )
}

export default Home