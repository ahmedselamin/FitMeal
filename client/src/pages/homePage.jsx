import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Stack, Box, Button } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
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
      {/* Add Post Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ borderRadius: '20px', paddingX: '20px' }} 
          onClick={() => console.log('Redirect to Add Post Form')}
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
                      style={{ maxHeight: '200px', width: 'auto', objectFit: 'cover', borderRadius: '8px' }}
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
    </Box>
  );
};

export default HomePage;
