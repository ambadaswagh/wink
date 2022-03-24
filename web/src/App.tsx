import './App.scss';

import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import PaymentSuccess from './Callbacks/PaymentSuccess';
import CookieBanner from './CookieBanner';
import Loading from './Loading';
import Order from './Orders/Order';
import routes from './services/routes';

const Login = lazy(() => import('./Auth/Login'));
const StripeAccountOnboardingCallback = lazy(
  () => import('./Callbacks/StripeAccountOnboardingCallback')
);
const Home = lazy(() => import('./Home/Home'));
const Impressum = lazy(() => import('./Legal/Impressum'));
const PrivacyPolicy = lazy(() => import('./Legal/PrivacyPolicy'));
const Dashboard = lazy(() => import('./Merchant/Dashboard'));
const Logout = lazy(() => import('./Auth/Logout'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="app">
        <Switch>
          <Route path={routes.order} component={Order} />
          <Route path={routes.paymentSuccess} component={PaymentSuccess} />
          <Route path={routes.dashboard} component={Dashboard} />
          <Route path={routes.authLogin} component={Login} />
          <Route path={routes.authLogout} component={Logout} />
          <Route path={routes.aboutUs} component={Impressum} />
          <Route path={routes.privacyPolicy} component={PrivacyPolicy} />
          <Route
            path={routes.stripeAccountOnboardingCallback}
            component={StripeAccountOnboardingCallback}
          />
          <Route path={routes.home} exact component={Home} />
          <Redirect to={routes.home} />
        </Switch>
        <CookieBanner />
      </div>
    </Suspense>
  );
};

export default App;
