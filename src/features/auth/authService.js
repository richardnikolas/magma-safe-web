import axios from 'axios';

class AuthService {
  getUserByEmail = async ({ userEmail }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/users/email/${userEmail}`
    );

    return response.data;
  };

  getuserByEmail = async ({ userId }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
    );

    return response.data;
  }

  createNewUser = async ({ request }) => {
    const response = await axios.post(
      `${window.env.REACT_APP_BACKEND_URL}/api/users`,
      request
    );

    return response.data;
  };
};

export default new AuthService();