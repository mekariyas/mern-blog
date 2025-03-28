import Post from "../models/postModel.js"


//create a post

export const createPost = async(req, res)=>{
    const { id } = req.params
    const { title, body , tags } = req.body
    
    if(!id || !title || !body ){
        return res.status(400).json({message: "incomplete data"})
    }

    try{
        if (tags){
            console.log(tags)
        }
        await Post.create({author: id, title, body, tags })
        return res.status(201).json({message: "Post created", success:true})
    }catch(error){
        return res.status(500).json({message: `Internal Server Error: ${error.message}`, success:false})
    }
}

//all posts by an author -using author-id (mongoose.schema.objectId) 

export const getPosts = async(req, res)=>{
    const { id } = req.params;
    
    if(!id){
       return res.status(400).json({message: "Id was not provided", success:false})
    }
    try{
        const posts = await Post.find({author:id})
        if(posts.length == 0){
            return res.status(404).json({message: "No posts have been found ", success:false})
        }
        return res.status(200).json({message: "Posts found",posts, success:true})
    }catch(error){
        return res.status(500).json({message: `Internal Server Error: ${error.message}`, success:false})
    }
}

//find a single post
export const getPostById = async(req, res)=>{
    const {id}  = req.params

    if(!id){
        return res.status(400).json({message: "Id was not provided", success:false})
    }
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message: "Post not Found", success: false})
        }
        return res.status(200).json({message: "Post found", success: true, post})
    }catch(error){
        return res.status(500).json({message: `Internal Server Error: ${error.message}`, success:false})
    }
}

//find post using id and update it 

export const updatePost = async(req, res)=>{
    const { id } = req.params;
    const { title, body, tags} = req.body
    
    if(!id || !title || !body ){
        return res.status(400).json({message: "no information provided", success: false})
    }
    try{
        //ensure if the post exists or not
        const post= await Post.findById(id)
        if(!post){
            return res.status(404).json({message: "Post not Found", success: false})
        }
        await Post.findByIdAndUpdate( id, { title, body, tags })
        return res.status(200).json({message: "Post updated", success:true})
    }catch(error){
        return res.status(500).json({message: `Internal Server Error: ${error.message}`, success:false})
    }
}


//find and delete a post using its id

export const deletePost = async(req, res)=>{
    const {id} = req.params

    if(!id){
        return res.status(400).json({message:"Invalid or empty id", success: false})
    }
    try{
        //ensure if the post exists or not
        const post = await Post.findById(id)
        if(!post){ 
            return res.status(404).json({message: "Post not Found", success: false})
        }

        await Post.findByIdAndDelete(id)

        return res.status(200).json({message: "Post Deleted", success:true})
    }catch(error){
        return res.status(500).json({message: `Internal Server Error: ${error.message}`, success:false})
    }
}