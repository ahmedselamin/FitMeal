import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
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
      <Stack spacing={3}>
        {posts.length === 0 ? (
          <Typography>No posts available</Typography>
        ) : (
          posts.map((post) => (
            <Card key={post._id} sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title || 'No Title'}
                </Typography>

                {/* Render the image if it exists */}
                {post.image && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <img
                      src={`http://localhost:3030/uploads/${post.image.split('\\').pop()}`} 
                      alt={post.title}
                      style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Box>
                )}

                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                  {post.instructions || 'No Instructions'}
                </Typography>

                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '10px' }}>
                  {post.CreatedAt ? new Date(post.CreatedAt).toLocaleDateString() : 'No Date'}
                </Typography>

                {/* Render ingredients if they exist */}
                {post.ingredients && (
                  <Typography variant="body2" sx={{ marginTop: '10px' }}>
                    <strong>Ingredients:</strong> {JSON.parse(post.ingredients[0]).join(', ')}
                  </Typography>
                )}

                {/* Render author if exists */}
                {post.author && (
                  <Typography variant="caption" display="block" sx={{ marginTop: '10px' }}>
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
