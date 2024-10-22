import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from './utils/axiosInstance'; // Adjust the path if necessary

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username: formData.username,
        password: formData.password,
      });

      const token = response.data.token;
      const decodedToken = jwtDecode(token);

      const user = decodedToken['name'];

      // Save to local storage and update state
      localStorage.setItem('token', token);
      localStorage.setItem('username', user);
      setIsAuthenticated(true);
      setUsername(user);

      return true; 
    } catch (error) {
      console.error('Login error:', error);
      
      return false; 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
