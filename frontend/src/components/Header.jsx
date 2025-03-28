import { useState } from 'react'
import {Link , useParams,useNavigate} from "react-router-dom"
import axiosApi from '../api/axios'

const Header = ({...props}) => {
  const [navIsVisible, setNavIsVisible] = useState(false)
  const {id} = useParams()

  const navigate = useNavigate();

  //nav bar visibility
  const handleNavVisibility = ()=>{
    
    setNavIsVisible(!navIsVisible)
  }


  const handleLogOut = async()=>{
    try{
      const logOut = await axiosApi.get(`/user/logout`)
      if (logOut.status == 200){
        navigate("/login")
      }
    }catch(error){
      props.setIsError(true)
      return props.setErrorMessage(error.message)
    }
  }
  return (
    <header className="w-full h-18 bg-linear-to-r text-white from-blue-800 to-blue-400 flex justify-between items-center">
        <span className="w-30 h-10 ml-3 text-lg md:text-xl bg-white text-blue-950 text-center pt-2 pb-2 font-bold rounded-md">MERN-Blog</span>
        <button className="w-14 h-10  flex flex-col justify-center items-center gap-2 mr-2 rounded-sm md:hidden" onClick={handleNavVisibility}>
          <span className={`bg-white h-1 w-12 transition-all duration-150 ease-in-out ${navIsVisible? 'relative top-2 -rotate-45':''}`}></span>
          <span className={`bg-white h-1 w-12 transition-all duration-150 ease-in-out ${navIsVisible? "hidden":""}`}></span>
          <span className={`bg-white h-1 w-12 transition-all duration-150 ease-in-out ${navIsVisible? 'relative bottom-1 rotate-45' :''}`}></span>
        </button>
        <nav className={`${navIsVisible?"sm-flex sm-flex-col": "hidden"}  bg-linear-to-r text-white from-blue-800 to-blue-400 w-60 h-[50vh] md:mr-3 flex flex-col justify-around items-center md:flex  md:flex-row md:justify-around md:items-center text-lg md:text-xl absolute right-0 top-18 z-[2] md:static  md:bg-none md:w-[40%] md:h-[75%]`}>
            <Link to={`/user/${id}/Create`} className="w-[90%]  md:w-40 h-12 text-center p-2 bg-blue-950 text-white rounded-md font-bold text-lg md:text-xl">Create Post</Link>
            <Link to={`/user/${id}/Posts`} className="w-[90%] md:w-40 h-12 text-center p-2 bg-blue-950 text-white rounded-md font-bold text-lg md:text-xl">Posts</Link>
            <button className="w-[90%] md:w-40 h-12 text-center p-2 bg-red-700 text-white rounded-md font-bold text-lg md:text-xl cursor-pointer" onClick={handleLogOut}>Log out</button>
        </nav> 
    </header>
  )
}

export default Header