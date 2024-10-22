import User from '../models/user.js'
import Post from '../models/post.js'

export const addBookmark = async (req, res) => {
    const userId = req.user.id
    const postId = req.params.id

    try {
        const user = await User.findById(userId);
        
        if(user.bookmarks.includes(postId)){
            return res.status(400).json({ message: "Already bookmarked" })
        }

        user.bookmarks.push(postId)
        await user.save();

        return res.status(201).json({ message: "Post added to bookmarks" })

    } catch (error) {
        return res.status(500).json({ message : error })
    }
}