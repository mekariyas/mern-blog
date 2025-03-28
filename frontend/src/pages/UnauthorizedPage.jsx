import React from 'react'
import { Link }  from "react-router-dom";


const Unauthorized = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col items-center gap-2 p-4">
        <h1 className="w-full h-4 text-center text-base md:text-lg font-bold">Unauthorized Access</h1>
        <p className="w-[20%] h-6 p-2 text-base md:text-lg">
            Please, <Link to="/logIn" className="text-base md:text-lg text-blue-600 underline-offset-1 underline font-bold"> Log in </Link>
            or 
            <Link to="/signup" className="text-base md:text-lg text-blue-600 underline-offset-1 underline font-bold">Sign up</Link>
        </p>

    </section>
  )
}

export default Unauthorized