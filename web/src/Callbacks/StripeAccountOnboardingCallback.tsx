import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api, apiUri } from '../services/api';
import { getApiConfig } from '../services/auth';
import routes, { history } from '../services/routes';

type RouteParams = {
  callbackType: 'refresh' | 'return' | 'start';
  merchantId: string;
};

const StripeAccountOnboardingCallback: React.FC = () => {
  const { callbackType, merchantId } = useParams<RouteParams>();

  const redirectToOnboarding = useCallback(async () => {
    try {
      const response = await api.post<ApiPostStripeConnectAccountResponse>(
        apiUri('/merchants/stripe/account/connect'),
        { merchantId },
        getApiConfig()
      );

      if (response.data?.accountActivationLink) {
        window.location.href = response.data?.accountActivationLink;
      } else {
        // TODO: error handling
        alert(response.data.message);
      }
    } catch (err) {
      // TODO: error handling
      alert(err);
    }
  }, [merchantId]);

  const updateAccountStatus = useCallback(async () => {
    try {
      await api.put<ApiPutStripeAccountStatus>(
        apiUri('/merchants/stripe/account/status'),
        { merchantId },
        getApiConfig()
      );
    } catch (err) {
      // TODO: error handling
      alert(err);
    } finally {
      history.push(routes.dashboard);
    }
  }, [merchantId]);

  useEffect(() => {
    async function onLoad() {
      switch (callbackType) {
        case 'refresh':
        case 'start':
          await redirectToOnboarding();
          break;
        case 'return':
          await updateAccountStatus();
          break;
        default:
          // TODO: handle error
          alert(`Unexpected stripe onboarding callback type '${callbackType}'!`);
          break;
      }
    }
    onLoad();
  }, [callbackType, redirectToOnboarding, updateAccountStatus]);

  if (callbackType === 'return') {
    return <div>Please wait while we are checking your Stripe account status...</div>;
  }
  return <div>Please wait while being redirected to Stripe...</div>;
};

export default StripeAccountOnboardingCallback;
