import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { MdCancel } from "react-icons/md";

import axiosApi from '../api/axios';

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName ] = useState("");
  const [ username, setUsername] = useState("");

  const [isError, setIsError ] = useState(false);
  const [errorMessage, setErrorMessage ] = useState("")
  const { id } = useParams();

  const getData = async ()=>{
    try{
      console.log(id)
      const requestData = await axiosApi.get(`/user/${id}`)
      console.log(requestData)
      const {data} = requestData
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setUsername(data.userName)
    }catch(error){
      setErrorMessage(error.message);
      return setIsError(true)
    }
  }

  useEffect(()=>{
    getData()
  },[])
  
  return (
    <>
        <Header setIsError ={setIsError} setErrorMessage={setErrorMessage} />
        <section className='w-full flex flex-col items-center gap-4 h-[88vh] '>
        {isError && 
          (<div className="w-[20%] h-12 relative z-[4] flex flex-col items-center bg-slate-200 top-4">
             <h1 className="w-full h-4 top-2 text-center text-base font-semibold md:font-bold text-red-600 md:text-lg">{errorMessage? errorMessage: "error"}</h1>
            <button className="w-4 h-4 absolute text-red-600 rounded-lg items-center right-1 top-0.5 cursor-pointer"><MdCancel/></button>
          </div>)}
          <section className=" w-[60%] h-[30%] flex  flex-col justify-start gap-2 mt-2 pt-6">
              <span className="text-lg md:text-xl ml-2">Name: {firstName} {lastName}</span>
              <span className="text-lg md:text-xl ml-2"><i>Username: @{username}</i></span>
          </section>
        </section>
    </>
  )
}

export default Dashboard