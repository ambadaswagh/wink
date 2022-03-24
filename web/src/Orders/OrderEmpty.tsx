import { Card, Container, Content, Heading, Section } from 'react-bulma-components';
import { useTranslation } from 'react-i18next';

import LocaleDropdown from '../Header/LocaleDropdown';

const OrderEmpty: React.FC<OrderEmptyProps> = ({ serviceLocation, servicePoint }) => {
  const { t } = useTranslation();

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
          <Content>
            <p>{t('no-order-found', 'No order found.')}</p>
            <p>
              {t(
                'order-error-tips-title',
                'If you think this might be an error, here are some tips that could help:'
              )}
            </p>
            <ul>
              <li>
                {t(
                  'order-error-tips-1',
                  'If your waiter is currently taking payment for someone else in your table, the cash register might be locked for other payments. Please wait until they have finished collecting the other payments and try again.'
                )}
              </li>
              <li>
                {t(
                  'order-error-tips-2',
                  'If you have used Wink to pay for the order already, the items will not appear in this screen anymore. To request a receipt, please ask your waiter. Additional tips after closing the check are currently not supported.'
                )}
              </li>
              <li>
                {t(
                  'order-error-tips-3',
                  'The QR Code scanned might have been misplaced. If the waiter had to put two tables together for your group, or had to separate some seats from one table into two, it is possible that this QR Code does not match the table used by your waiter to enter your order. Check your surroundings to see if there is any other QR Code that could be the correct one.'
                )}
              </li>
              <li>
                {t(
                  'none-helped-ask-waiter',
                  'If none of this helped, please ask your waiter for assistance.'
                )}
              </li>
            </ul>
          </Content>
        </Card.Content>
      </Card>
    </Section>
  );
};

export default OrderEmpty;

interface OrderEmptyProps {
  serviceLocation: Partial<ServiceLocation>;
  servicePoint: Partial<ServicePoint>;
}
