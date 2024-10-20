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

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
    const { title, description, ingredients, instructions, author } = req.body;
  
    try {
      const newPost = new Post({ title, description, ingredients, instructions, author });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ message: 'Error creating post' });
    }
  });
