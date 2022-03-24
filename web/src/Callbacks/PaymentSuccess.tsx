import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Content,
  Heading,
  Loader,
  Notification,
  Section,
  Table,
} from 'react-bulma-components';
import { useTranslation } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';

import LocaleDropdown from '../Header/LocaleDropdown';
import { api, apiUri } from '../services/api';
import { getSession, SessionData, userId } from '../services/customerSession';
import routes, { history } from '../services/routes';

enum SettlementStatus {
  PAID = 'PAID',
  UPDATED = 'UPDATED',
  ABORTED = 'ABORTED',
}

const PaymentSuccess: React.FC<RouteComponentProps> = ({ location }) => {
  const { t } = useTranslation();
  const search = new URLSearchParams(location.search);
  const paramUserId = search.get('userId') || '';
  const [session, setSession] = useState<SessionData>();
  const [settlementStatus, setSettlementStatus] = useState<SettlementStatus>(SettlementStatus.PAID);
  if (userId !== paramUserId) throw Error('Received callback does not match local state');

  useEffect(() => {
    // const getSessionFromServer = async () => {
    //   const response = await api.get<ApiGetOrderResponse>(apiUri('orders'));
    //   return response.data;
    // };
    const retrieveSession = async () => {
      const session = getSession();
      if (!session) {
        throw Error(`Session ${userId} does not exist`);
      }
      console.log('session:', session);
      setSession(session);
    };

    retrieveSession();
  }, []);

  useEffect(() => {
    if (!session) return;
    if (!session.processorTransactionId) {
      if (session.servicePoint.servicePointId) {
        history.push(routes.order.replace(':id', session.servicePoint.servicePointId));
      } else {
        history.push(routes.home);
      }
      return;
    }
    const load = async () => {
      const response = await api.post<ApiBillUpdateResponse>(apiUri('bill/update'), {
        processorTransactionId: session.processorTransactionId,
        servicePoint: session.servicePoint,
        order: session.order,
        settlementRequest: session.settlementRequest,
      });
      const data = response.data;
      console.log('bill/update response:', data);
      if (data.message === 'OK') {
        setSettlementStatus(SettlementStatus.UPDATED);
        return;
      }
      setSettlementStatus(SettlementStatus.ABORTED);
    };
    load();
  }, [session]);

  if (!session) {
    return (
      <Section style={{ textAlign: 'center' }}>
        {t('wait-retrieving-order', 'Please wait, retrieving your order...')}
        <div className="page-loader" />
      </Section>
    );
  }

  const { order, settlementRequest, servicePoint, serviceLocation } = session;
  const outstandingItems = order.items.filter((i) => i.payable);
  const { items, tipAmount } = settlementRequest;
  const paidItems = outstandingItems
    .filter((i) => items.some((selected) => selected.orderItemId === i.orderItemId))
    .map((i) => {
      const selection = items.find((selected) => selected.orderItemId === i.orderItemId);
      if (!selection) throw Error('Assertion');
      const quantity = selection.quantity;
      return Object.assign({}, i, { quantity });
    });
  const total = paidItems.reduce((total, i) => total + i.quantity * i.unitPrice, 0) + tipAmount;

  return (
    <Section>
      <Card>
        <Card.Content>
          <Container display="flex" justifyContent="space-between">
            <div>
              <Heading>{serviceLocation?.name}</Heading>
              <Heading subtitle>
                {t(serviceLocation?.servicePointDenomination?.singular || 'Table')}{' '}
                {servicePoint.name}
              </Heading>
            </div>
            <LocaleDropdown />
          </Container>
          <Table style={{ width: '100%' }}>
            <tbody>
              {paidItems.map((o, idx) => (
                <tr key={idx}>
                  <td>
                    {o.quantity} x {o.description}
                  </td>
                  <td className="has-text-right">{o.unitPrice.toFixed(2)}</td>
                </tr>
              ))}
              {!!tipAmount && (
                <tr>
                  <td>{t('tip', 'Tip')}</td>
                  <td className="has-text-right">{tipAmount.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600 }}>
                <td>{t('total-paid', 'Total Paid')}</td>
                <td className="has-text-right">€ {total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </Table>
          {settlementStatus === SettlementStatus.PAID && (
            <div className="is-flex is-flex-direction-row">
              <Loader style={{ marginRight: 10 }} />
              <b>{t('wait-notify-restaurant', 'Please wait while we notify the restaurant...')}</b>
            </div>
          )}
          {settlementStatus === SettlementStatus.UPDATED && (
            <div>
              <b>
                {t('transaction-completed', 'Transaction completed. Thank you for using Wink!')}
              </b>
            </div>
          )}
          {settlementStatus === SettlementStatus.ABORTED && (
            <div>
              <Notification color="warning">
                <Content>
                  <b>{t('transaction-failed', 'Transaction Failed')}</b>
                  <br />
                  {t(
                    'refund-issued-because-error',
                    'A refund was issued to your payment method because the restaurant reported an error. This is usually due to one of the following reasons:'
                  )}
                  <ul>
                    <li>
                      {t(
                        'refund-reason-already-paid',
                        'One or more items that you tried to pay are already paid, either directly to the waiter or by someone else using Wink.'
                      )}
                    </li>
                    <li>
                      {t(
                        'refund-reason-taking-payment',
                        'The waiter is currently taking payment for another guest at your table.'
                      )}
                    </li>
                    <li>
                      {t(
                        'refund-reason-adding-items',
                        'The waiter is currently adding more items to your order.'
                      )}
                    </li>
                    <li>
                      {t(
                        'refund-reason-cash-register-problems',
                        'The cash register system for the restaurant is experiencing technical difficulties.'
                      )}
                    </li>
                  </ul>
                  {t(
                    'refund-extra-info',
                    'A refund might take up to 72 hours to appear in your credit card statement. For debit cards, the funds might be unavailable during this period. You may reattempt the payment by clicking Start Over, or pay directly to your waiter.'
                  )}
                </Content>
              </Notification>
              <Button renderAs={Link} to={`/r/${servicePoint.servicePointId}`} color="dark">
                {t('start-over', 'Start Over')}
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>
    </Section>
  );
};

export default PaymentSuccess;
