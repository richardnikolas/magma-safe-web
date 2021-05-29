const homeUrl = 'http://localhost:3000';

window.env = {
  REACT_APP_ENV: 'Development',
  REACT_APP_HOME_URL: homeUrl,
  REACT_APP_REDIRECT_URI: `${homeUrl}/callback`,
  REACT_APP_BACKEND_URL: 'https://magmasafeapi.azurewebsites.net',
  REACT_APP_MAGMA_AES_KEY: 'M4gm4Sup3rS3cr3tK3y'
};
