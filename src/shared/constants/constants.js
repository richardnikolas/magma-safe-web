import { routes } from './routes';

export const fetchStatus = Object.freeze({
  notFetched: 'notFetched',
  fulfilled: 'fulfilled',
  pending: 'pending',
  rejected: 'rejected',
  forbidden: 'forbidden'
});

export const drawerItems = [
  { 
    name: 'Home', 
    link: routes.home.path,
    icon: 'Home'
  },
  { 
    name: 'Servers', 
    link: routes.servers.path,
    icon: 'Dns'
  },
  { 
    name: 'Secrets', 
    link: routes.secrets.path,
    icon: 'Lock'
  },
  { 
    name: 'Histórico', 
    link: routes.home.recents,
    icon: 'History'
  },
  { 
    name: 'Perfil',
    link: routes.profile.path,
    icon: 'AccountBox'
  }
];
