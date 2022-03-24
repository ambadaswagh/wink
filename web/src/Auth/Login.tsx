import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { api } from '../services/api';
import { saveToken } from '../services/auth';
import config from '../services/config';
import routes, { history } from '../services/routes';
import { fullUrl } from '../services/web';

const Login: React.FC<RouteComponentProps> = ({ location }) => {
  const code = new URLSearchParams(location.search).get('code');
  const [processing, setProcessing] = useState(!!code);

  useEffect(() => {
    if (!code) return;

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: config.cognito.appClientId,
      redirect_uri: fullUrl(routes.authLogin),
    });
    api
      .post<CognitoAuthResponse>('https://auth.winkapp.me/oauth2/token', params, {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(async ({ data }) => {
        if (!data.access_token || !data.id_token) {
          setProcessing(false);
          return;
        }
        saveToken(data);
        history.replace(routes.dashboard);
      })
      .catch(() => setProcessing(false));
  });

  if (!processing) {
    setTimeout(() => history.push(routes.home), 3000);
    return <div>Authentication failed, please wait...</div>;
  }

  return <div>Please wait while we load your profile information</div>;
};

export default Login;
