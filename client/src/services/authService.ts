import axios from 'axios';

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post('/api/auth/login', { username, password });
  return response.data;
};
