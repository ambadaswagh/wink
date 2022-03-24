import './DashboardHome.scss';
import 'material-icons/iconfont/material-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React, { useContext, useState } from 'react';
import { Button, Card, Heading, Section, Table } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import { getLocalUser } from '../services/auth';
import { fetchDashboardData, UserContext } from '../services/contexts/user';
import routes from '../services/routes';
import ServicePointsTable from './ServiceLocation/ServicePointsTable';

const StripeAccountLink = ({ merchant }: { merchant: Merchant }) => {
  const stripeAccount = merchant.stripeAccount;

  if (stripeAccount?.activationStatus === 'ACTIVE') {
    return (
      <a
        href={`https://dashboard.stripe.com/${encodeURIComponent(stripeAccount.accountId)}`}
        target="_blank"
        rel="noreferrer"
      >
        My Stripe Account
      </a>
    );
  }

  return (
    <a
      href={`/stripe-account-onboarding/start/${encodeURIComponent(merchant.merchantId)}`}
      target="_blank"
      rel="noreferrer"
    >
      Connect Stripe Account
    </a>
  );
};

const DashboardHome: React.FC = () => {
  const user = useContext(UserContext);
  const localUser = getLocalUser();
  const merchant = user?.merchant;
  const stripeAccount = merchant?.stripeAccount;
  const [selectedLocationId, setSelectedLocationId] = useState(
    merchant?.serviceLocations.length === 1
      ? merchant?.serviceLocations[0].serviceLocationId
      : undefined
  );

  if (!merchant) throw Error('Merchant not selected');

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading className="is-flex is-flex-direction-row is-justify-content-space-between">
            <span>Dashboard</span>
            <div>
              {Number(user?.availableMerchantAccounts.length) > 1 && (
                <Button
                  renderAs={Link}
                  to={routes.selectAccount}
                  style={{ marginRight: 10 }}
                  title="Switch Accounts"
                >
                  <i className="fas fa-exchange-alt" style={{ fontSize: '16px' }} />
                </Button>
              )}
              <Button onClick={fetchDashboardData} title="Refresh Data">
                <i className="fas fa-sync" style={{ fontSize: '16px' }} />
              </Button>
            </div>
          </Heading>
          <Heading subtitle title={user?.merchantUser?.userId}>
            Welcome, {localUser?.profile.given_name}!
          </Heading>
          <StripeAccountLink merchant={merchant} />
        </Card.Content>
      </Card>
      <div className="columns dashboard-tiles">
        <div className="column is-6">
          <div className="dashboard-tile">
            <div className="icon-header">
              <i className="material-icons primary">account_balance_wallet</i>
            </div>
            <div className="tile-content">
              <h3>Checkouts</h3>
              <p>
                <span>0</span>
                <span> Last 30 days</span>
              </p>
            </div>
            <span className="view-all-button">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
        <div className="column is-6">
          <div className="dashboard-tile">
            <div className="icon-header">
              <i className="material-icons secondary">account_balance</i>
            </div>
            <div className="tile-content">
              <h3>Balance</h3>
              {stripeAccount?.accountId ? (
                <p>
                  <span>0€</span>
                  <span> Including tips</span>
                </p>
              ) : (
                <p>
                  Account not connected
                  <br />
                  <a
                    href={`/stripe-account-onboarding/start/${encodeURIComponent(
                      merchant.merchantId
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect Stripe Account
                  </a>
                </p>
              )}
            </div>
            {stripeAccount?.accountId ? (
              <a
                className="view-all-button"
                href={`https://dashboard.stripe.com/${encodeURIComponent(stripeAccount.accountId)}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-angle-right"></i>
              </a>
            ) : (
              <a
                className="view-all-button"
                href={`/stripe-account-onboarding/start/${encodeURIComponent(merchant.merchantId)}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-angle-right"></i>
              </a>
            )}
          </div>
        </div>
      </div>
      <div>
        <Heading size={4}>Service Locations</Heading>
        {merchant.serviceLocations.map((l) => (
          <Card key={l.serviceLocationId} style={{ marginBottom: 20 }}>
            <Card.Header
              onClick={() =>
                setSelectedLocationId((id) =>
                  id === l.serviceLocationId ? undefined : l.serviceLocationId
                )
              }
              style={{ cursor: 'pointer' }}
            >
              <Card.Header.Title>
                <Heading size={5}>{l.name}</Heading>
              </Card.Header.Title>
              <Card.Header.Icon
                className={
                  l.serviceLocationId === selectedLocationId
                    ? 'fas fa-angle-up'
                    : 'fas fa-angle-down'
                }
              />
            </Card.Header>
            {l.serviceLocationId === selectedLocationId && (
              <Card.Content>
                <Heading subtitle>{l.serviceLocationId}</Heading>
                <Table className="is-fullwidth is-bordered">
                  <tbody>
                    <tr>
                      <th>POS System</th>
                      <td>{l.posSystemId}</td>
                    </tr>
                    {Object.entries(l.posParameters).map((param) => (
                      <tr key={param[0]}>
                        <th>{param[0]}</th>
                        <td>{param[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <ServicePointsTable
                  serviceLocationId={l.serviceLocationId}
                  servicePoints={l.servicePoints}
                  denomination={merchant.servicePointDenomination}
                />
              </Card.Content>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default DashboardHome;
