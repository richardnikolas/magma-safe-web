import axios from 'axios';

class ServersService {
  getServerById = async ({ id }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/servers/${id}`
    );

    return response.data;
  };

  getServersByUserId = async ({ userId }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/servers/user/${userId}`
    );

    return response.data;
  };

  createNewServer = async (request) => {
    const response = await axios.post(
      `${window.env.REACT_APP_BACKEND_URL}/api/servers`,
      request
    );

    return response.data;
  };

  addUserToServer = async (request) => {
    const response = await axios.post(
      `${window.env.REACT_APP_BACKEND_URL}/api/serversofusers`,
      request
    );

    return response.data;
  };

  updateServerIsFavorite = async (request) => {
    const response = await axios.patch(
      `${window.env.REACT_APP_BACKEND_URL}/api/serversofusers/isFavorite`,
      request
    );

    return response.data;
  };
}

export default new ServersService();