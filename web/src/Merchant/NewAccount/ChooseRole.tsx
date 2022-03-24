import clsx from 'clsx';
import { Card, Columns, Heading, Section } from 'react-bulma-components';

import useScrollTop from '../../hooks/useScrollTop';
import { getLocalUser } from '../../services/auth';
import classes from './ChooseRole.module.scss';

export enum NewAccountUserRole {
  MERCHANT = 'MERCHANT',
  POS = 'POS',
  CUSTOMER = 'CUSTOMER',
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onChoice }) => {
  const localUser = getLocalUser();
  useScrollTop();

  // sanity assertions
  if (!localUser) throw Error('User is not logged in');

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading>Welcome to Wink, {localUser.profile.given_name}!</Heading>
          <p>
            Let’s set up your new account. We need to know a little bit about you to get started.
          </p>
          <p>What is your interest in Wink?</p>
          <Columns className={classes.mainContent}>
            <Columns.Column>
              <Card
                className={classes.choiceCard}
                onClick={() => onChoice(NewAccountUserRole.MERCHANT)}
              >
                <Card.Content className="has-text-centered">
                  <i className={clsx('fas fa-utensils', classes.choiceIcon)} />
                  <br />I own <b>a restaurant</b> and want to know how I can add Wink as a payment
                  option for my guests
                </Card.Content>
              </Card>
            </Columns.Column>
            <Columns.Column>
              <Card className={classes.choiceCard} onClick={() => onChoice(NewAccountUserRole.POS)}>
                <Card.Content className="has-text-centered">
                  <i className={clsx('fas fa-tablet-alt', classes.choiceIcon)} />
                  <br />I <b>develop POS systems</b> for restaurants and want to integrate Wink with
                  my solution
                </Card.Content>
              </Card>
            </Columns.Column>
            <Columns.Column>
              <Card
                className={classes.choiceCard}
                onClick={() => onChoice(NewAccountUserRole.CUSTOMER)}
              >
                <Card.Content className="has-text-centered">
                  <i className={clsx('fas fa-qrcode', classes.choiceIcon)} />
                  <br />
                  I’m a customer, and when I visit a restaurant I want to be able to{' '}
                  <b>pay or split the bill</b> with Wink
                </Card.Content>
              </Card>
            </Columns.Column>
          </Columns>
          None of these describes the reason for your visit?{' '}
          <a href="mailto:info@winkapp.me">Contact us!</a>
        </Card.Content>
      </Card>
    </Section>
  );
};

export default ChooseRole;

interface ChooseRoleProps {
  onChoice: (role: NewAccountUserRole) => void;
}
