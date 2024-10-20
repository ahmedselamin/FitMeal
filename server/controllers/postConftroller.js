import Post from "../models/post.js"

// Get all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().populate('author', 'username'); 
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching posts' });
    }
});

