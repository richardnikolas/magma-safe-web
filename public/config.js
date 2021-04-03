const homeUrl = 'http://localhost:3000';

window.env = {
  REACT_APP_ENV: 'Development',
  REACT_APP_HOME_URL: homeUrl,
  REACT_APP_REDIRECT_URI: `${homeUrl}/callback`
};
