import { authActions } from 'src/features/auth/redux';
import * as authOperations from 'src/features/auth/redux/authOperations';

export const storeUser = (store) => (next) => (action) => {
  if (action.type === authOperations.getUserByEmail.fulfilled.toString()) {
    const { auth } = store.getState();
    const { user } = auth;

    store.dispatch(authActions.setUser({ ...user }));

    try {
      localStorage.setItem('loggedUser', JSON.stringify(user));
    } catch {}
  } 
  else if (action.type === authOperations.getUserByEmail.rejected.toString()) {
    try {
      localStorage.removeItem('loggedUser');
      store.dispatch(authActions.cleanAuth);
    } catch {}
  }

  return next(action);
};