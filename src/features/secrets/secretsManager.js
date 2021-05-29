import {  encryptAES } from 'src/shared/constants/functions';
import secretsService from './secretsService';

class SecretsManager {
  getSecretsByUserId = async ({ userId }) =>
    secretsService.getSecretsByUserId({ userId });
  
  getSecretsByServerId = async ({ serverId }) =>
    secretsService.getSecretsByServerId({ serverId });

  createNewSecret = async ({ secretName, magmaSecret, serverId, userId }) => {
    const encryptedMagmaSecret = encryptAES(magmaSecret); 

    const request = {
      name: secretName,
      magmaSecret: encryptedMagmaSecret,
      serverId,
      userId
    };

    return secretsService.createNewSecret(request);
  };

  updateLastAccessedByUser = async ({ secretId, userId }) => {
    const request = {
      secretId,
      lastAccessedByUserId: userId
    };

    return secretsService.updateLastAccessedByUser(request);
  }
}

export default new SecretsManager();