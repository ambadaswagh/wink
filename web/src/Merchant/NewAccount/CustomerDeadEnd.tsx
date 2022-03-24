import { Button, Card, Heading, Section } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import useScrollTop from '../../hooks/useScrollTop';
import routes from '../../services/routes';

const CustomerDeadEnd: React.FC = () => {
  useScrollTop();

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading size={6}>Thank you for your interest in Wink!</Heading>
          <p style={{ marginBottom: 20 }}>
            Paying your bill at a restaurant with Wink is very easy, you don’t even need an account!
            All you have to do is use your phone camera application to scan the QR code present on
            your table, and you will be presented with the bill. You can then choose how you will
            make the payment, for example by entering your credit card information, or by choosing
            another financials service like ApplePay, GooglePay or PayPal.
          </p>
          <p style={{ marginBottom: 20 }}>
            If you don’t see a QR code on your table, or if the QR code is not a Wink code, that
            means this restaurant is not yet connected to Wink. In that case you will have to pay
            with your waitress or waiter. Use the opportunity to tell them about Wink!
          </p>
          <Button renderAs={Link} to={routes.home}>
            Back to Homepage
          </Button>
        </Card.Content>
      </Card>
    </Section>
  );
};

export default CustomerDeadEnd;
