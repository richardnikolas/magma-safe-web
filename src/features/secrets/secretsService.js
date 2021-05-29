import axios from 'axios';

class SecretsService {
  getSecretsByUserId = async ({ userId }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/secrets/user/${userId}`
    );

    return response.data;
  };

  getSecretsByServerId = async ({ serverId }) => {
    const response = await axios.get(
      `${window.env.REACT_APP_BACKEND_URL}/api/secrets/server/${serverId}`
    );

    return response.data;
  }

  createNewSecret = async (request) => {
    const response = await axios.post(
      `${window.env.REACT_APP_BACKEND_URL}/api/secrets`,
      request
    );

    return response.data;
  };

  updateLastAccessedByUser = async (request) => {
    const response = await axios.patch(
      `${window.env.REACT_APP_BACKEND_URL}/api/secrets/lastAccessedByUser`,
      request
    );

    return response.data;
  };
}

export default new SecretsService();