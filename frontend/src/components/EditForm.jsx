import { useState, useEffect } from 'react'
import { MdCancel } from "react-icons/md";
import axiosApi from '../api/axios'

//component for editing post

const EditForm = ({...props}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  //Error State and message for form submission error
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState("")
  
  //tagsText state
  const [tagsText ,setTagsText] = useState("")
  
  //new edited form state 
  const [newFormData, setNewFormData] = useState({
    title:props.title,
    body:props.body,
    tags:props.tags,
  })


  //on first render convert newFormData tags array elements into text string
  useEffect(()=>{
    if(newFormData.tags.length){
      setTagsText(newFormData.tags.join(","))
    }
  },[])

  //handle full form data formatting
  const handleTagsTextConversion = ()=>{
      
    if(tagsText){
      // store tagsTexts in array elements after formatting and return full data
        return tagsText.includes(",") ? tagsText.split(",").map((tagText)=> tagText.trim()) : [...tagsText.trim()]
      }
  }

  //form submission function
  const handleFormSubmit  = async (e)=> {
    e.preventDefault()
    try{
      //data variable
      let data =  handleTagsTextConversion() 
      setIsSubmitting(true)
      const sendData = await axiosApi.put(`/posts/post/${props.postId}`, {...newFormData, tags:data})
      
      if(sendData.status == 200){
        props.setIsEdit(false)
      }
      throw new Error(sendData.message)
    }catch(error){
      setErrorText(error.message)
      setError(true)
    }
    finally{
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full h-[80vh] flex flex-col justify-start items-center gap-2 relative">
    {error && 
      (<section className="w-[20%] rounded-sm ring-1 ring-blue-500 bg-slate-200 transition ease-in-out delay-75 duration-2  h-18 flex flex-col items-center absolute top-1 z-[2]">
        <div className="w-full h-4 flex justify-end">
          <button className="mt-1 mr-1 w-4 h-full text-red-600  rounded-lg cursor-pointer" onClick={()=> setError(false)}><MdCancel /></button>
        </div>
          <h1 className="w-full h-2 text-red-600 text-center">{errorText}</h1>
        </section>)}
        <form className="w-full md:w-[50%] flex flex-col  gap-2" onSubmit={handleFormSubmit}>
            <label htmlFor='title' className="ml-2 text-lg md:text-xl">Title:</label>
            <input type="text" value = {newFormData.title}  onChange={(e)=> setNewFormData({...newFormData, [e.target.id]: e.target.value})} id="title" className="bg-blue-200 w-[80%] ml-8 h-10 rounded-md pl-2"/>
            <label htmlFor="body" className="ml-2 text-lg md:text-xl">Body:</label>
            <textarea  maxLength={500} value={newFormData.body} onChange={(e)=> setNewFormData({...newFormData, [e.target.id]: e.target.value})} id="body"  className="bg-blue-200 h-32 pl-2 w-[80%] ml-8 rounded-md outline-none focus:outline-solid"></textarea>
            <label htmlFor="tags" className="ml-2 text-lg md:text-xl">Tags: <i>(eg: html,css,javascript)</i></label>
            <input type="text" 
            value={tagsText} 
            onChange={(e)=> setTagsText(e.target.value)}
            id="tags"  className="bg-blue-200 w-[80%] ml-8 h-10 rounded-md pl-2"/>
            <div className="h-16 w-full flex items-center justify-center">
                <input type="submit" value="Submit" disabled={isSubmitting}  className={`${isSubmitting? "bg-slate-200 cursor-not-allowed": ""} w-[60%] h-10 text-lg md:text-xl font-bold rounded-md bg-blue-700 text-white cursor-pointer`}/>
            </div>
        </form>
          <button type="button" disabled={isSubmitting} className={`${isSubmitting? "bg-slate-200 cursor-not-allowed": ""} bg-red-700 text-xl md:text-lg font-bold text-white w-[20%] h-10 rounded-md cursor-pointer`} onClick={()=> props.setIsEdit(false)}>Cancel</button>
    </section>
  )
}

export default EditForm