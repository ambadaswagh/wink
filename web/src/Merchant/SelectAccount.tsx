import { useContext } from 'react';
import { Card, Columns, Heading, Section, Table } from 'react-bulma-components';

import { getLocalUser } from '../services/auth';
import { selectMerchant, UserContext } from '../services/contexts/user';
import routes, { history } from '../services/routes';
import classes from './SelectAccount.module.scss';

const SelectAccount: React.FC = () => {
  const localUser = getLocalUser();
  const user = useContext(UserContext);
  if (!user) throw Error('User not logged in');

  const handleSelectMerchant = (merchantId: string) => {
    selectMerchant(merchantId);
    history.push(routes.dashboard);
  };

  const showTable =
    user.availableMerchantAccounts.length > 3 || user.merchantUser?.roles.includes('ADMIN');
  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading>Account Selection</Heading>
          <Heading subtitle>Welcome, {localUser?.profile.given_name}!</Heading>
          Choose the account to open its dashboard
        </Card.Content>

        {showTable ? (
          <Table className="is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Locations</th>
                <th>Tables</th>
                <th>Stripe</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {user.availableMerchantAccounts.map((m) => (
                <tr key={m.merchantId}>
                  <td title={m.merchantId}>{m.merchantId.substring(0, 6)}…</td>
                  <td>
                    <span onClick={() => handleSelectMerchant(m.merchantId)} className="link">
                      {m.name || '(missing)'}
                    </span>
                  </td>
                  <td>{m.serviceLocations.length}</td>
                  <td>{m.serviceLocations.reduce((sum, l) => sum + l.servicePoints.length, 0)}</td>
                  <td>{m.stripeAccount?.activationStatus === 'ACTIVE' ? '✅' : '⏳'}</td>
                  <td>{m.status?.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Columns>
            {user.availableMerchantAccounts.map((m) => (
              <Columns.Column>
                <Card
                  className={classes.choiceCard}
                  onClick={() => handleSelectMerchant(m.merchantId)}
                >
                  <Card.Content className="has-text-centered">{m.name}</Card.Content>
                </Card>
              </Columns.Column>
            ))}
          </Columns>
        )}
      </Card>
    </Section>
  );
};

export default SelectAccount;
