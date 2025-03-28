import { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

import { v4 as uuid } from "uuid";
import { FaLongArrowAltLeft, FaEdit } from 'react-icons/fa'

import axiosApi from '../api/axios'

import EditForm from '../components/EditForm';

const Post = () => {
  //post data state
  const [postData, setPostData ] = useState([])
  
  //post id from param
  const { postId } = useParams()
  
  //navigation
  const navigate = useNavigate()

  //error state
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  //editing state
  const [isEdit, setIsEdit] = useState(false)

  const handleDataFetch = async()=>{
    try{
      const dataFetch  =  await axiosApi.get(`/posts/post/${postId}`)
      const { data } =  dataFetch;
      const { post } = data
      setPostData({id:post._id, title:post.title, body:post.body, tags:post.tags})
      return
  } catch(error){
    if(error.response?.status == 500){
      setErrorMessage("Internal server Error try, again")
      setError(true)
    }
    console.log(error)
    setErrorMessage("Error, please press the button below to go to  the previous page")
    setError(true)
  }
  }

  // Api call on first render
  useEffect(()=>{
    handleDataFetch()
  },[])

  return (
    <>
      <nav className="w-full h-18 bg-linear-to-r text-white from-blue-800 to-blue-400 flex justify-between items-center sticky top-0 z-[2]">
        <button onClick={()=> navigate(-1)} className="ml-4 text-lg md:text-xl flex flex-col cursor-pointer">
          <span className="h-4 text-lg md:text-xl font-bold">Go back</span>
          <FaLongArrowAltLeft  className="text-white w-15 h-6"/>
        </button>
      </nav>
      <section className="mt-8">
      {/*error message and action*/} 
        {error && (
          <div className="w-full flex flex-col items-center">
            <p className="w-full h-10 text-lg text-red-600 md:text-xl text-center">{errorMessage}</p> 
            <button className="flex items-center w-28 h-8 rounded-md bg-slate-400 cursor-pointer" onClick={()=>navigate(-1)}>
              <FaLongArrowAltLeft  className= "w-10 h-6"/> 
              <span>Go back</span>
            </button>
          </div>)}
      {/*data display  or edit */}

      {postData.id ? (
          <>
            {isEdit? (<EditForm  postId = {postId} setIsEdit={setIsEdit} id={postData.id} title={postData.title} body={postData.body} tags={postData.tags}/>):(
              <section className="w-full flex flex-col items-center">
                <section className="w-[80%] flex-flex-col relative  min-h-[20vh]">
                  <button className="w-12 h-12 rounded-md bg-slate-200 absolute top-0.5 right-1 z-[2] cursor-pointer flex items-center justify-center" onClick={()=>setIsEdit(true)}>
                    <FaEdit/>
                  </button>
                  <h2 className="w-full font-bold text-xl md:text-lg text-center">{postData.title}</h2>
                  <p className="text-wrap w-[90%] p-4">{postData.body}</p>

                  {/*render tags if they exist tags */}
                  {postData.tags.length? 
                    (<div className="w-full h-16 flex items-center mt-2 gap-2 flex-wrap">{
                        postData.tags.map(tag=>{
                          return(
                            <span key={uuid()} className="w-14 max-w-16 min-h-8 max-h-12 ml-2 truncate  pb-2 pl-2 text-blue-800 font-semibold  italic text-wrap underline cursor-pointer">#{tag}</span>)})}
                    </div>):(<></>)}

                </section>
              </section>)}
          </>):
          (<></>)
        }
      </section>
    </>
  )
}





export default Post