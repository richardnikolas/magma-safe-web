import authService from './authService';

class AuthManager {
  getUserByEmail = async ({ userEmail }) => authService.getUserByEmail({ userEmail });

  getUserById = async ({ userId }) => authService.getUserById({ userId });

  createNewUser = async ({ userEmail, userName }) => {
    const request = {
      name: userName,
      email: userEmail
    };

    return authService.createNewUser({ request });
  };
};

export default new AuthManager();