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
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={3} sx={{ maxWidth: '420px', width: '100%' }}>
        {posts.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary">
            No posts available
          </Typography>
        ) : (
          posts.map((post) => (
            <Card 
              key={post._id} 
              sx={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '20px', 
                boxShadow: 2, 
                padding: '9px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)', 
                },
                width: '100%', 
                maxHeight: '500px', 
              }}
            >
              <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {post.title || 'No Title'}
                </Typography>

                {post.image && (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      marginY: '10px' 
                    }}
                  >
                    <img
                      src={`http://localhost:3030/uploads/${post.image.split('\\').pop()}`} 
                      alt={post.title}
                      style={{ 
                        maxHeight: '300px',
                        width: '280px', // Keep the aspect ratio
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                      }}
                    />
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ marginY: '10px' }}>
                  {post.instructions || 'No Instructions'}
                </Typography>

                {/* Render ingredients if they exist */}
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
                
                <Typography variant="caption" display="block" sx={{ marginY: '5px', fontStyle: 'italic' }}>
                  {post.CreatedAt ? new Date(post.CreatedAt).toLocaleDateString() : 'No Date'}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default HomePage;
