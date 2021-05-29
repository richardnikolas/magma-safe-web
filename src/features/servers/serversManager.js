import { fetchStatus } from 'src/shared/constants';
import serversService from './serversService';

class ServersService {
  getServersByUserId = async ({ userId }) =>
    serversService.getServersByUserId({ userId });  

  getServerById = async ({ serverId, servers }) => {
    if (servers && servers.fetchStatus === fetchStatus.fulfilled)
      return servers.find(s => s.id === serverId);

    return serversService.getServerById({ id: serverId });
  };

  createNewServer = async ({ adminId, serverName }) => {
    const request = {
      adminId,
      name: serverName
    };

    return serversService.createNewServer(request);
  };

  addUserToServer = async ({ serverId, userEmail }) => {
    const request = {
      serverId, 
      userEmail
    };

    return serversService.addUserToServer(request);
  };

  updateServerIsFavorite = async ({ serverId, userId, isFavorite }) => {
    const request = {
      serverId,
      userId,
      isFavorite
    };

    return serversService.updateServerIsFavorite(request);
  };
}

export default new ServersService();