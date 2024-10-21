import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  Typography, 
  Stack,
  Box, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null, 
    author: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] // Set the selected image file
    });
  };

  const clearForm = () => {
    setFormData({
      title: "",
      image: null,
      ingredients: "",
      instructions: "",
      author: ""
    });
  };

  const openDialog = () => {
    setOpen(true);
  }

  const closeDialog = () => {
    setOpen(false);
    clearForm();
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
  data.append('title', formData.title);
  data.append('ingredients', formData.ingredients);
  data.append('instructions', formData.instructions);
  
  // If there's an image, append it to the FormData
  if (formData.image) {
    data.append('image', formData.image);
  }

  try {
    const response = await axiosInstance.post('/posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    closeDialog(); 
    fetchPosts();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', maxWidth: '600px', marginX: 'auto' }}>
        <Button 
          variant="contained" 
          onClick={openDialog}
          sx={{
            backgroundColor: '#005477',
            color: 'white', 
            borderRadius: '20px', 
            paddingX: '25px', 
            paddingY: '10px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }} 
        >
          Add Post
        </Button>
      </Box>

      <Stack spacing={3} sx={{ maxWidth: '450px', margin: '0 auto' }}>
        {posts.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            No posts available
          </Typography>
        ) : (
          posts.map((post) => (
            <Card key={post._id} sx={{ backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: 2, padding: '15px' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {post.title || 'No Title'}
                </Typography>

                {post.image && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '10px' }}>
                    <img
                      src={`http://localhost:3030/uploads/${post.image.split('\\').pop()}`} 
                      alt={post.title}
                      style={{ maxHeight: '300px', width: '300px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ marginY: '10px' }}>
                  {post.instructions || 'No Instructions'}
                </Typography>
                {post.ingredients && (
                  <Typography variant="body2" sx={{ marginY: '10px' }}>
                    <strong>Ingredients:</strong> {JSON.parse(post.ingredients[0]).join(', ')}
                  </Typography>
                )}  
                {post.author && (
                  <Typography variant="caption" display="block" sx={{ marginY: '5px' }}>
                    <strong>Author:</strong> {post.author.username || 'Unknown'}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      <Dialog maxWidth="xs" fullWidth open={open} close={closeDialog}>
        <DialogTitle sx={{ textAlign: "center" }}>Share A Recipe</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit}>
            <TextField
              margin="dense"
              name="title"
              label="Name"
              type="text"
              fullWidth
              required
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="ingredients"
              label="Ingredients"
              type="text"
              fullWidth
              required
              value={formData.ingredients}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="instructions"
              label="Instructions"
              type="text"
              fullWidth
              required
              value={formData.instructions}
              onChange={handleInputChange}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: '10px' }}
            />
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Button variant="outlined" onClick={closeDialog} sx={{ color: 'black', borderRadius: '20px' }}>
                Discard
              </Button>
              <Button variant="contained" type="submit" sx={{ backgroundColor: '#005477', borderRadius: '20px' }}>
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomePage;
