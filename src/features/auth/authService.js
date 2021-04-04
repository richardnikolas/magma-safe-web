import axios from 'axios';

class AuthService {
  getUserMyEmail = async ({ userEmail }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/users/email/${userEmail}`
    );

    return response.data;
  };
};

export default new AuthService();