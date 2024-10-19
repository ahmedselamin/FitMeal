import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desctiprion: {
        type: String
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now(),
    }
});

const Post = new mongoose.model("Post", postSchema);

export default Post;