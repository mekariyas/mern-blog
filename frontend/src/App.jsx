import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Dashboard from './pages/Dashboard';
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Post from './pages/Post';
import ErrorPage from "./pages/ErrorPage";
import Unauthorized from './pages/unauthorizedPage';


const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/logIn" element={<SignIn/>}/>
          <Route path="/*" element={<ErrorPage/>}/>
          <Route path="/user/:id">
            <Route index element={<Dashboard/>}/>
            <Route path="posts" element={<Posts/>}/>
            <Route path="Create" element={<CreatePost/>}/>
            <Route path="post/:postId" element={<Post/>}/>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
        </Routes>
    </>
  )
}

export default App