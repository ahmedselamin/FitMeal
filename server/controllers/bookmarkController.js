import User from '../models/user.js'

export const getBookmarks = asyn (req, res) => {
    const userId = req.User.id;

    try {
        const user = await findById(userId)

        if(!user){
            return res.status(404).json({ message: "Not found" })
        }

        const bookmarks = user.bookmarks
        return res.status(201).json(bookmarks)
    } catch (error) {
        return res.status(500).jsong({ message: error })
    }
}

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

export const removeBookmark = async (req, res) => {
    const userId = req.User.Id;
    const postId = req.params.id;

    try {
        const user = await findById(userId);

        if(!user.bookmarks.includes(postId)){
            return res.status(400).json({ message: "Post not bookmarked" })
        }

        user.bookmarks.filter(id => id.toString() !== postId)
        return res.status(201).json({ message: "removed from bookmarks" })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}