import axios from 'axios';

class ServersService {
  getServersByUserId = async ({ userId }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/servers/user/${userId}`
    );

    return response.data;
  };

  createNewServer = async ({ request }) => {
    const response = await axios.post(
      `${window.env.REACT_APP_BACKEND_URL}/api/servers`,
      request
    );

    return response.data;
  };
}

export default new ServersService();