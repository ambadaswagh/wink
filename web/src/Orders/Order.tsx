import './Order.scss';

import { loadStripe } from '@stripe/stripe-js';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Container, Form, Heading, Section, Table } from 'react-bulma-components';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

import LocaleDropdown from '../Header/LocaleDropdown';
import { api, apiUri } from '../services/api';
import config from '../services/config';
import { setSession, userId } from '../services/customerSession';
import { Env, env } from '../services/env';
import i18n from '../services/i18n';
import routes, { history } from '../services/routes';
import OrderEmpty from './OrderEmpty';

const tippingOptions = [
  {
    label: '5%',
    multiplier: 0.05,
  },
  {
    label: '10%',
    multiplier: 0.1,
  },
  {
    label: '20%',
    multiplier: 0.2,
  },
  {
    label: '€__',
    multiplier: null,
  },
];

const Order: React.FC<RouteComponentProps<OrderParams>> = ({ match }) => {
  const id = match.params.id;

  const { t } = useTranslation();
  const [error, setError] = useState<string>();
  const [service, setService] = useState<ApiGetOrderResponse>();
  const [selection, setSelection] = useState<string[]>([]);
  const [split, setSplit] = useState(false);
  const [tipOption, setTipOption] = useState(1);
  const [tipAmount, setTipAmount] = useState('0');
  const [capabilities, setCapabilities] = useState<PosCapabilities>();
  const { servicePoint, serviceLocation, order, stripeAccountId } = service || {};
  const orderTotal =
    order?.items.reduce(
      (total, item) =>
        total +
        (!split || selection.some((s) => s === item.orderItemId) ? 1 : 0) *
          item.quantity *
          (item.unitPrice +
            item.modifiers.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)),
      0
    ) || 0;
  const total = (orderTotal || 0) + Number(tipAmount);
  const invalidCheck =
    Number(tipAmount) < 0 ||
    Number(tipAmount) > Math.max(100, orderTotal) ||
    isNaN(Number(tipAmount)) ||
    orderTotal <= 0;

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get<ApiGetOrderResponse>(apiUri('orders', [id]));
      if (data.message !== 'OK') {
        setError(data.message);
        return;
      }
      setService(data);
      const settlementRequest: SettlementRequest = {
        items: data.order.items.map((i) => ({
          orderItemId: i.orderItemId,
          quantity: i.quantity,
        })),
        tipAmount: 0, // not used in the interface because we want the input to be text
      };
      setSelection(data.order.items.map((i) => i.orderItemId));
      setSession({
        order: data.order,
        settlementRequest,
        servicePoint: data.servicePoint,
        serviceLocation: data.serviceLocation,
      });
      setCapabilities(data.posCapabilities);
      if (!data.posCapabilities.tip) {
        const tipOption = tippingOptions.findIndex(
          (o) => o.multiplier === null || o.multiplier === 0
        );
        if (tipOption === -1) throw Error('No tipping option allows for 0 tip?');
        setTipOption(tipOption);
        setTipAmount('0');
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    const multiplier = tippingOptions[tipOption].multiplier;
    if (multiplier) setTipAmount((multiplier * orderTotal).toFixed(2));
  }, [tipOption, orderTotal]);

  const toggleSelection = useCallback(
    (orderItemId: string) =>
      setSelection((sel) =>
        sel.some((s) => s === orderItemId)
          ? sel.filter((s) => s !== orderItemId)
          : sel.concat(orderItemId)
      ),
    []
  );

  const handlePay = async () => {
    if (!order || !servicePoint || !serviceLocation?.merchantId) {
      alert('Page loaded incorrectly, please refresh and try again.');
      return;
    }

    if (!stripeAccountId) {
      setError(t('stripe-error-nosetup', 'Stripe account not set up'));
      return;
    }

    const stripe = await loadStripe(config.stripe.publishableKey, {
      stripeAccount: stripeAccountId,
    });

    if (!stripe) {
      setError(t('stripe-error-no-load', 'Could not load stripe'));
      return;
    }

    const settlementRequest: SettlementRequest = {
      items: order.items
        .filter((i) => selection.some((s) => s === i.orderItemId))
        .map((i) => ({
          orderItemId: i.orderItemId,
          quantity: i.quantity,
        })),
      tipAmount: Number(tipAmount),
    };
    const checkoutInfo: ApiPostBillCreateBody = {
      userId,
      merchantId: serviceLocation.merchantId,
      order,
      settlementRequest,
      locale: i18n.language,
    };
    const checkout = await api
      .post<ApiPostBillCreate>(apiUri('bill/create'), checkoutInfo)
      .then((resp) => resp.data);
    const { processorTransactionId, message } = checkout;
    if (!processorTransactionId) {
      setError(message);
      return;
    }

    setSession({
      order,
      servicePoint,
      settlementRequest,
      serviceLocation,
      processorTransactionId,
    });

    const redir = await stripe.redirectToCheckout({
      sessionId: processorTransactionId,
    });
    if (redir.error.message) {
      setError(redir.error.message);
    }
  };
  const handlePayTest = () => {
    if (!order || !servicePoint || !serviceLocation?.merchantId) {
      alert('Page loaded incorrectly, please refresh and try again.');
      return;
    }
    const settlementRequest: SettlementRequest = {
      items: order.items
        .filter((i) => selection.some((s) => s === i.orderItemId))
        .map((i) => ({
          orderItemId: i.orderItemId,
          quantity: i.quantity,
        })),
      tipAmount: Number(tipAmount),
    };
    setSession({
      order,
      servicePoint,
      settlementRequest,
      serviceLocation,
      processorTransactionId: `test-${Date.now()}`,
    });
    history.push(routes.paymentSuccess + `?userId=${userId}`);
  };

  if (error) {
    return (
      <Section>
        <Card>
          <Card.Content>
            <Container display="flex" justifyContent="space-between">
              <Heading>{t('an-error-occurred', 'An error occurred')}</Heading>
              <LocaleDropdown />
            </Container>
            <p>
              {t('following-error-order', 'The following error occurred when reading the order:')}
            </p>
            <p className="has-text-danger">{error}</p>
            <p>{t('ask-waiter-assistance', 'Please ask your server for assistance.')}</p>
          </Card.Content>
        </Card>
      </Section>
    );
  }

  if (!servicePoint || !serviceLocation || !order) {
    return (
      <Section style={{ textAlign: 'center' }}>
        {t('wait-retrieving-order', 'Please wait, retrieving your order...')}
        <div className="page-loader" />
      </Section>
    );
  }

  if (!order.items.length) {
    return <OrderEmpty serviceLocation={serviceLocation} servicePoint={servicePoint} />;
  }

  const handleClickSplit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const split = e.currentTarget.name === 'split';
    setSelection(split ? [] : order.items.map((i) => i.orderItemId));
    setSplit(split);
    if (split) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById('payButton')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section>
      <Card>
        <Card.Content>
          <Container display="flex" justifyContent="space-between">
            <div>
              <Heading>{serviceLocation.name}</Heading>
              <Heading subtitle>
                {t(serviceLocation.servicePointDenomination?.singular || 'Table')}{' '}
                {servicePoint.name}
              </Heading>
            </div>
            <LocaleDropdown />
          </Container>
          <Table className="is-fullwidth">
            <tbody>
              {order.items.map((o, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor:
                      split && selection.some((s) => s === o.orderItemId) ? '#ffd' : undefined,
                  }}
                >
                  {split && (
                    <td key="1" className="split-column">
                      <Form.Checkbox
                        checked={selection.some((s) => s === o.orderItemId)}
                        onChange={(e) =>
                          e.target.checked
                            ? setSelection((sel) =>
                                sel.filter((s) => s !== o.orderItemId).concat(o.orderItemId)
                              )
                            : setSelection((sel) => sel.filter((s) => s !== o.orderItemId))
                        }
                      />
                    </td>
                  )}
                  <td key="2" onClick={split ? () => toggleSelection(o.orderItemId) : undefined}>
                    {o.quantity} x {o.description}
                    {!!o.modifiers.length &&
                      o.modifiers.map((m, idx) => (
                        <div key={idx} className="item-modifier">
                          {m.description} {m.unitPrice && '+' + m.unitPrice.toFixed(2) + '€'}
                        </div>
                      ))}
                  </td>
                  <td
                    key="3"
                    style={{
                      textAlign: 'right',
                      color:
                        !split || selection.some((s) => s === o.orderItemId) ? undefined : '#ccc',
                    }}
                    onClick={split ? () => toggleSelection(o.orderItemId) : undefined}
                  >
                    {(
                      (o.unitPrice +
                        o.modifiers.reduce(
                          (sum, item) => sum + item.unitPrice * item.quantity,
                          0
                        )) *
                      o.quantity
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600 }}>
                <td colSpan={split ? 2 : 1}>
                  {split
                    ? t('checkout-order-total-split', 'My share')
                    : t('checkout-order-total', 'Order total')}
                  <div className="checkout-vat-message">
                    {t('not-including-tip-but-vat', 'Not including tip, but including VAT.')}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>€ {orderTotal.toFixed(2)}</td>
              </tr>
              <tr></tr>
            </tfoot>
          </Table>
          {capabilities?.splitMethod !== 'FULL_ORDER' &&
            !(capabilities?.splitMethod === 'LINE_ITEM' && order.items.length === 1) &&
            !(
              capabilities?.splitMethod === 'ITEM' &&
              order.items.length === 1 &&
              order.items[0].quantity === 1
            ) && (
              <section className="split-area">
                <Button color={split ? undefined : 'danger'} name="full" onClick={handleClickSplit}>
                  {t('pay-full-check', 'Pay Full Check')}
                </Button>
                <Button
                  color={split ? 'danger' : undefined}
                  name="split"
                  onClick={handleClickSplit}
                >
                  {t('split-bill', 'Split Bill')}
                </Button>
              </section>
            )}
          {capabilities?.tip && (
            <section className="tip-area">
              {t('give-waiter-love-tipping', 'Give your waiter love by tipping')}
              <div className="tip-container">
                {tippingOptions.map((o, idx) => (
                  <div
                    key={o.label}
                    className={clsx('tip', tipOption === idx && 'selected')}
                    onClick={() => setTipOption(idx)}
                  >
                    {o.label}
                  </div>
                ))}
              </div>
            </section>
          )}
          <Table className="is-fullwidth">
            {!!capabilities?.tip && tipOption === 3 && (
              <tbody>
                <tr>
                  <td>{t('tip-amount', 'Tip Amount')}</td>
                  <td className="is-flex is-justify-content-flex-end">
                    <Form.Control className="has-icons-left tip-input">
                      <input
                        type="number"
                        min={0}
                        step={0.5}
                        value={tipAmount}
                        onChange={(e) => setTipAmount(e.target.value)}
                        className={clsx('input has-text-right', invalidCheck && 'is-danger')}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-euro-sign" />
                      </span>
                    </Form.Control>
                  </td>
                </tr>
              </tbody>
            )}
            <tfoot>
              <tr style={{ fontWeight: 600 }}>
                <td>{t('my-total', 'My total')}</td>
                <td style={{ textAlign: 'right' }}>€ {total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </Table>
          <Button
            type="button"
            id="payButton"
            color="primary"
            onClick={handlePay}
            disabled={invalidCheck}
          >
            {t('pay-now', 'Pay Now')}
          </Button>
          {env === Env.Dev && (
            <Button type="button" color="info" style={{ marginLeft: 20 }} onClick={handlePayTest}>
              Test Pay
            </Button>
          )}
        </Card.Content>
      </Card>
    </Section>
  );
};

export default Order;

interface OrderParams {
  id: string;
  table: string;
}
