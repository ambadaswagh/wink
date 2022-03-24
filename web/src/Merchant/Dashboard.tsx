import React, { lazy, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../Loading';
import {
  fetchDashboardData,
  registerSetUserContext,
  User,
  UserContext,
} from '../services/contexts/user';
import routes, { history } from '../services/routes';
import DashboardHome from './DashboardHome';

const NewAccount = lazy(() => import('./NewAccount'));
const SelectAccount = lazy(() => import('./SelectAccount'));
const GenerateServicePoints = lazy(() => import('./ServiceLocation/GenerateServicePoints'));
const PlacesList = lazy(() => import('../Admin/Places/PlacesList'));

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // This initializes the context module and allows other components to modify
    // the state of the context
    registerSetUserContext(setUser);
    fetchDashboardData().catch((err) => {
      // TODO: error handling
      alert(err.message);
    });
  }, []);

  const hasUser = !!user?.merchantUser;
  const hasAccess = !!user?.availableMerchantAccounts.length || !!user?.merchantUser?.roles.length;
  const hasSelectedAccount = !!user?.merchant;

  useEffect(() => {
    if (hasUser && hasAccess && !hasSelectedAccount) {
      history.push(routes.selectAccount);
    }
  }, [hasUser, hasAccess, hasSelectedAccount]);

  if (!user) {
    return <Loading />;
  }

  // redundant, but clearer
  if (!hasUser || !hasAccess) {
    // user doesn't exist, or exists but has access to 0 merchants
    return <NewAccount />;
  }

  return (
    <UserContext.Provider value={user}>
      {!hasSelectedAccount ? (
        <SelectAccount />
      ) : (
        <Switch>
          <Route path={routes.selectAccount} component={SelectAccount} />
          <Route path={routes.createServicePoints} component={GenerateServicePoints} />
          <Route path={routes.placesDetails} component={PlacesList} />
          <Route path={routes.places} component={PlacesList} />
          <DashboardHome />
        </Switch>
      )}
    </UserContext.Provider>
  );
};

export default Dashboard;
