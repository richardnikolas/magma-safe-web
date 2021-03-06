
export const routes = Object.freeze({
  home: {
    path: '/home',
    recents: '/home/recents'
  },
  login: {
    path: '/login'
  },
  servers: {
    path: '/servers',
    param: ':serverId'
  },
  secrets: {
    path: '/secrets'
  },
  profile: {
    path: '/profile'
  },
  callback: {
    path: '/callback'
  },
  error: {
    path: '/error'
  }
});