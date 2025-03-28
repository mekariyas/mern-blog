import { useState,useEffect} from 'react';
import { Link, useParams, useNavigate} from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa';
import axiosApi from '../api/axios';

const Posts = () => {
  //get id
  const { id } = useParams()

  //navigation setup
  const navigate = useNavigate()

  //setup post state
  const [posts, setPosts] = useState([])

  //no posts state
  const [noPosts, setNoPosts ] = useState(false)
  //Error state
  const [isError, setIsError] = useState(false)
  // error message for 500 status code
  const [errorMessage,setErrorMessage] = useState("")

  const handleFetchDataOnLoad = async() =>{
    try{
      const dataFetch = await axiosApi.get(`/posts/user/${id}/posts`)
      const { data } = dataFetch;
      const postsData = await data.posts;
      setPosts(postsData)
      return
      
      
      
    }catch(error){
      if(error.status == 404 || error.status == 400){
        return setNoPosts(true) 
      }
      else if(error.status == 500){
        setErrorMessage(error.message)
        setIsError(true)
        return
      }
      setErrorMessage(error.message)
      return setIsError(true)
    }
  }

  const [isDeleted, setIsDeleted] = useState(false)
  ///fetch data on first load
  useEffect(()=>{
    if(isDeleted){
      handleFetchDataOnLoad()
      const timer = setTimeout(()=>{
        setIsDeleted(false)
      },5000)

      return ()=> clearTimeout(timer)
    }
    handleFetchDataOnLoad()
  },[id, isDeleted])


  //reset error states
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setNoPosts(false);
      return ()=> clearTimeout(timer)
    }, 5000);
  
    return () => clearTimeout(timer); // Proper cleanup
  }, [isError, noPosts]);


  //handle Post Delete
  const handlePostDelete = async(event, id)=>{
    event.stopPropagation();
    
    try{
      const deletePost = await axiosApi.delete(`/posts/post/${id}`)
      console.log(deletePost)
      return setIsDeleted(true)

      
    }catch(error){
      if(error.status === 404 ||  error.status === 400){
        return setNoPosts(true)
      }
      else if(error.status == 500){
        setErrorMessage(error.message)
        return isError(true)
      }
      setErrorMessage(error.message)
      return setIsError(true)
    }
  }
  return (
    <>
      <nav className="w-full h-18 bg-linear-to-r text-white from-blue-800 to-blue-400 flex justify-between items-center sticky top-0 z-[2]">
        <Link to={`/user/${id}`} className="ml-4 text-lg md:text-xl flex flex-col">
          <span className="h-4 text-lg md:text-xl font-bold">Go back</span>
          <FaLongArrowAltLeft  className="text-white w-15 h-6"/> 
        </Link>
      </nav>

      <section className="mt-18">

        {/*no posts error */}
        {noPosts &&(<h2 className='w-full h-20 text-lg md:text-xl text-red-600 relative z-[2] font-bold text-center'>No Posts Found</h2>)}
        
        {isError && (<h2 className='w-full h-20 text-lg md:text-xl text-red-600 relative z-[2] font-bold text-center'>
            {errorMessage? errorMessage :"Error try Again"}
        </h2>)}
        {/*posts  */}

        {posts.length > 0 ? (<ul className="w-full flex flex-col items-center gap-4">
            {posts.map((post)=>{
              return (
            <li key={post._id} onClick={()=> navigate(`/user/${id}/post/${post._id}`)} className="sm:w-[70%] md:w-[90%] shadow-lg shadow-blue-600 rounded-md flex flex-col gap-[2px] relative overflow-hidden hover:bg-indigo-300 cursor-pointer transform ease-in-out delay-75 duration-200">
            
            <button onClick={(event)=>handlePostDelete(event,post._id)}
              className="w-8 h-8 md:w-12 md:h-12 items flex justify-center items-center rounded-md bg-slate-200 cursor-pointer absolute top-0.5 right-1">
              <FaTrash className="text-red-700"/>
            </button>
            
              <h2 className="w-full h-6 text-lg font-bold md:text-xl mt-2 ml-4">{post.title}</h2>
              
              <p className="w-full p-1 md:p-4  max-h-14 md:max-h-18 text-wrap truncate text-base md:text-lg ml-2">{post.body}</p>

                {post.tags.length >0 ? (<div className="w-full h-16 flex items-center mt-2 gap-2 flex-wrap">{
                    post.tags.map(tag=>{
                    return(<span key={uuid()} className="w-14 max-w-16 min-h-8 max-h-12 ml-2 truncate  pb-2 pl-2 text-blue-800 font-semibold  italic text-wrap underline">#{tag}</span>)})
                }
                </div>): (<></>)}
            </li>
          )
            })}
        </ul>): (<></>)}
      </section>

    </>
  )
}

export default Posts