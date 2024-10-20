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
        {posts.length < 0 ? 
          (
           <Typography>No posts available</Typography>
          ) : (
          posts.map((post) => (
            <Card key={post.id} sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.description}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) }
      </Stack>
    </Box>
  );
};

export default HomePage;
