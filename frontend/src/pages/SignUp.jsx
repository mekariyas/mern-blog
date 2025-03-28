import {useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { BiShow,BiHide } from "react-icons/bi"; 

import axiosApi from "../api/axios"


const SignUp = () => {
    //password visibility
    const [visible, setVisible] = useState(false);
    const handlePasswordVisibility = ()=>{
        setVisible(!visible)
    }
    //signUp error
    const [invalid, setInvalid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState("")

    //form data and handling

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        username:"",
        password:""
    })
    

    const handleFormData = (e)=>{
        const { name, value} = e.target;

        setFormData({...formData, [e.target.name]: e.target.value })
    }

    //form-control state
    const [submitting, setSubmitting] = useState(false);
    
    // navigation 

    const navigate = useNavigate();

    //form-submit function
    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        setSubmitting(true)
        try{
            const sendData = await axiosApi.post("/user/signUp", {...formData})
            const receivedData = await sendData.data
            console.log(receivedData)
            if(receivedData.success){
                navigate(`/user/${receivedData.id}`)
            }
            setInvalidMessage(receivedData.message)
            setSubmitting(false)
        }catch(error){
            if(error.status === 409){
                setSubmitting(false)
                setInvalid(true)
                setInvalidMessage("username or email already taken")
                return
            }
            setInvalid(true)
            setInvalidMessage(error.message)
            return setSubmitting(false)
        }
    }  
    //clear error text
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
    <div className="w-full h-screen flex flex-col justify-start items-center">
        <form className="w-full h-[70%] flex flex-col justify-start mt-4 md:w-[50%] md:h-[80%] md:mt-none gap-2 mb-4" onSubmit={handleFormSubmit}>
            <label htmlFor="firstName" className="ml-2 text-lg md:text-xl">First Name:</label>
            <input type="text" value={formData.firstName} name="firstName" id="firstName" required className="bg-blue-200 h-10 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid" onChange={handleFormData}/>
            <label htmlFor="lastName" className="ml-2 text-lg md:text-xl">Last Name:</label>
            <input type="text"  value={formData.lastName} name="lastName" id="lastName" required className="bg-blue-200 h-10 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid " onChange={handleFormData}/>
            <label htmlFor="username" className="ml-2 text-lg md:text-xl">Username:</label>
            <input type="text" value={formData.username}  name="username" id="username" required className="bg-blue-200 h-10 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid" onChange={handleFormData}/>
            <label htmlFor="email" className="ml-2 text-lg md:text-xl">Email:</label>
            <input type="email" value={formData.email} name="email" id="email" required className=" bg-blue-200 h-10 pl-2 w-[90%] ml-2 rounded-md outline-none focus:outline-solid" onChange={handleFormData}/>
            <label htmlFor="password" className="ml-2 text-lg md:text-xl">Password:</label>
            <div className="w-[100%] flex ">
                <input type={visible? "text": "password"} value={formData.password} name="password" id="password" required className="bg-blue-200 h-10 pl-2 w-[75%] ml-2 rounded-l-md focus:outline-solid" onChange={handleFormData}/>
                <button type="button" className="w-[15%] h-[10] bg-blue-800 text-white rounded-r-md text-center cursor-pointer flex justify-center items-center" onClick={handlePasswordVisibility}>
                    {visible? <BiHide /> : <BiShow />}
                </button>
            </div>
            {invalid && (<p className="ml-2 text-red-400 text-lg md:text-xl">{invalidMessage}</p>)}
            <input type="submit" value="Sign Up" className={`${submitting? "bg-slate-500 cursor-not-allowed":""} bg-blue-800 text-white w-[80%] h-12 text-center text-lg m-auto  md:ml-10  rounded-md md:text-xl cursor-pointer`} disabled={submitting}/>
        </form>
        <span className="text-lg md:text-xl">Already have an account? <Link to="/logIn" className="text-lg font-bold text-blue-800 underline">LogIn</Link></span>
    </div>
  )
}

export default SignUp