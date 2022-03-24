import React, { lazy, useCallback, useContext, useEffect, useState } from 'react';
import { Card, Heading, Section } from 'react-bulma-components';

import { getLocalUser } from '../../services/auth';
import { UserContext } from '../../services/contexts/user';
import routes, { history } from '../../services/routes';
import ChooseRole, { NewAccountUserRole } from './ChooseRole';

const CustomerDeadEnd = lazy(() => import('./CustomerDeadEnd'));
const NewMerchant = lazy(() => import('./NewMerchant'));
const PosDeveloperContactForm = lazy(() => import('./PosDeveloperContactForm'));

const NewAccount: React.FC = () => {
  const localUser = getLocalUser();
  const user = useContext(UserContext);
  const merchantUser = user?.merchantUser;
  const [role, setRole] = useState<NewAccountUserRole | undefined>(getInitialRole);

  useEffect(() => {
    if (!localUser) {
      // not logged in, nothing we can do
      history.push(routes.home);
    }
  }, [localUser]);

  const handleBack = useCallback(() => {
    localStorage.removeItem('wink.form.role');
    setRole(undefined);
  }, []);

  if (!localUser) {
    return null;
  }

  // Dispatch user to where they left off in the setup wizard

  if (!merchantUser) {
    // no record in the database: very first step

    if (role === NewAccountUserRole.CUSTOMER) {
      // for now, customers will only see a static page
      localStorage.removeItem('wink.form.role');
      return <CustomerDeadEnd />;
    }
    if (role === NewAccountUserRole.POS) {
      // pos developers will see a contact form
      localStorage.removeItem('wink.form.role');
      return <PosDeveloperContactForm onBack={handleBack} />;
    }
    if (role === NewAccountUserRole.MERCHANT) {
      localStorage.setItem('wink.form.role', 'merchant');
      // this is the main wizard route to create a merchant user and give access to the dashboard
      return <NewMerchant onBack={handleBack} />;
    }

    return <ChooseRole onChoice={setRole} />;
  }

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading>Welcome, {localUser.profile.given_name}!</Heading>
          <Heading subtitle>{merchantUser.userId}</Heading>
        </Card.Content>
      </Card>
    </Section>
  );
};

export default NewAccount;

const getInitialRole = () => {
  const savedRole = localStorage.getItem('wink.form.role');
  return savedRole === 'merchant' ? NewAccountUserRole.MERCHANT : undefined;
};
