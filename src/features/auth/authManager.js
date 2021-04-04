import authService from './authService';

class AuthManager {
  getUserByEmail = async ({ userEmail }) => authService.getUserMyEmail({ userEmail });
};

export default new AuthManager();