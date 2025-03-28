import { useState, useEffect } from 'react';
import {useParams,useNavigate} from "react-router-dom";

import axiosApi from '../api/axios';

const CreatePost = () => {
  const [ title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tagText, setTagText] = useState("")
  const navigate = useNavigate();
  const {id} = useParams()


  //handle error state
  const [invalid, setInvalid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");

  //data submission
  const [submitting, setSubmitting] = useState(false)
  const handleBlogSubmission = async(e)=>{
    e.preventDefault()
    try{
      setSubmitting(true)
      if(tagText){
        let data = tagText.includes(",")? tagText.split(",").map((elem)=>elem.trim()): [tagText.trim()]
        const sendData = await axiosApi.post(`/posts/user/${id}/create`, {title:title.trim(), body:body, tags:data})
        setSubmitting(false)
        navigate(`/user/${id}/posts`)
        return 
      }
      const sendData = await axiosApi.post(`/posts/user/${id}/create`, {title:title, body:body})
      setSubmitting(false)
      navigate(`/user/${id}/posts`)
      return
    }catch(error){
      console.log(error)
      if(error.status == 400){
        setInvalid(true)
        setInvalidMessage("Incomplete data")
        setSubmitting(false)
      }
      else{
        setInvalid(true)
        setInvalidMessage("Error, try again")
        setSubmitting(false)
        return 
      }
    }
  }
  useEffect(()=>{
    if(invalid){
        const timer = setTimeout(() => {
            setInvalidMessage("")
            setInvalid(false)
        }, 5000);
        return clearTimeout(timer)
    }    
},[invalid])

  return (
    <div className="w-full flex flex-col items-center">
        <form className="w-full h-[40%] flex flex-col justify-start mt-4 md:w-[50%] md:h-[60%] md:mt-none gap-4 mb-4 pt-3" onSubmit={handleBlogSubmission}>
            <label htmlFor="title" className="ml-2 text-lg md:text-xl">Title:</label>
            <input type="text" id="title" required className="bg-blue-200 h-10 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid" onChange={(e)=>{
              setTitle(e.target.value)
            }}/>
            <label htmlFor="body" className="ml-2 text-lg md:text-xl">Body:</label>
            <textarea name="body" id="body" required maxLength={500} className="bg-blue-200 h-32 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid" onChange={(e)=>{
              setBody(e.target.value)
            }}></textarea>
            <label htmlFor="tags" className="ml-2 text-lg md:text-xl">Tags: (html,css,javascript)</label>
            <input type="text" id="tags" className="bg-blue-200 h-10 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid" onChange={(e)=>{setTagText(e.target.value)}}/>
            {invalid && (<p className="ml-2 text-red-400 text-lg md:text-xl">{invalidMessage}</p>)}
            <input type="submit" value="Post" className={ `${submitting? "bg-slate-500 cursor-not-allowed":""} bg-blue-800 text-white ml-4 w-[85%] md:w-[85%]  h-12 text-center text-lg m-auto md:w-[80%]  md:ml-6  rounded-md md:text-xl cursor-pointer`} disabled={submitting}/>
        </form>
        <button type="button" onClick={()=>{
          setTitle("")
          setBody("")
          setTagText("")
          setTags([])
          navigate(`/user/${id}`)}} className={`${submitting? "bg-slate-500 cursor-not-allowed":""} w-[40%] h-12 md:w-[20%] mt-2 mb-2 ml-2 mr-4 md:mr-16  bg-red-700 text-white  text-lg md:text-xl rounded-md cursor-pointer`} disabled={submitting}>Cancel</button>
    </div>
  )
}

export default CreatePost