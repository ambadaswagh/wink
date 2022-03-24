import { createBrowserHistory } from 'history';

const routes = {
  // common routes
  aboutUs: '/about',
  privacyPolicy: '/privacy',

  // restaurant routes
  home: '/',
  selectAccount: '/dashboard/select',
  dashboard: '/dashboard',
  createServicePoints: '/dashboard/servicePoints/create',
  places: '/dashboard/admin/places',
  placesDetails: '/dashboard/admin/places/:id',

  // restaurant routes: callbacks from external apps
  authLogin: '/cb/login',
  authLogout: '/cb/logout',
  stripeConnectSuccess: '/cb/connect',
  stripeAccountOnboardingCallback: '/stripe-account-onboarding/:callbackType/:merchantId',

  // customer routes
  order: '/r/:id',

  // customer routes: callbacks from external apps
  paymentSuccess: '/cb/paid',
  onboardingSuccess: '/cb/onboard',
};

export const history = createBrowserHistory();

export default routes;
