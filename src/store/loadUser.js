import { INITIAL_STATE as authInitialState } from 'src/features/auth/redux/authSlice';

const loadUser = () => {
  try {
    const serializedUser = localStorage.getItem('loggedUser');

    if (serializedUser === null) 
      return undefined;

    const user = JSON.parse(serializedUser);

    return { 
      auth: { ...authInitialState, user } 
    };
  } catch (e) {
    return undefined;
  }
};

export default loadUser;