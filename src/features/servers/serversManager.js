import serversService from './serversService';

class ServersService {
  getServersByUserId = async ({ userId }) =>
    serversService.getServersByUserId({ userId });  

  createNewServer = async ({ adminId, serverName }) => {
    const request = {
      adminId,
      name: serverName
    };

    return serversService.createNewServer({ request });
  }
}

export default new ServersService();