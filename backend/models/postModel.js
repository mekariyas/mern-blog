import mongoose,{ Schema, model } from "mongoose"

const postSchema = new Schema ({
    title: {
        type: String, 
        required:true
    },
    body: {
        type: String,
        required: true 
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, {timestamps: true}) 


const postModel = model('Post', postSchema)

export default postModel