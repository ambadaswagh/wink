import './Home.scss';

import React from 'react';
import { Button, Container, Heading, Hero } from 'react-bulma-components';
import { Trans, useTranslation } from 'react-i18next';

import Header from '../Header/Header';
import HomeFooter from './HomeFooter';
import HomeWaitlistForm from './HomeWaitlistForm';

const Home: React.FC = () => {
  const { t } = useTranslation('merchant');

  const scrollToWaitlistHead = () => {
    document.getElementById('heading-waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero color="primary">
        <Header />
        <Hero.Body className="mobile-bottompad">
          <Container>
            <Heading className="heading-toptitle" style={{ fontWeight: 'normal' }}>
              <Trans
                t={t}
                i18nKey="most-convenient-way-to-pay"
                defaults="The Most <b>Convenient</b> Way To <b>Pay</b> In Restaurants"
                components={{ b: <b /> }}
              />
            </Heading>
          </Container>
          <div className="columns">
            <div className="column">
              <div
                className="is-flex is-flex-direction-column div-arrows"
                style={{
                  color: '#190999',
                  fontFamily: 'montserrat,sans-serif',
                }}
              >
                <div className="is-flex is-flex-direction-row is-align-items-center div-arrow">
                  <Arrow />
                  <span>
                    <Trans
                      t={t}
                      i18nKey="turn-tables-faster"
                      defaults="Turn tables <b>faster</b>"
                      components={{ b: <b /> }}
                    />
                  </span>
                </div>
                <div className="is-flex is-flex-direction-row is-align-items-center div-arrow">
                  <Arrow />
                  <span>
                    <Trans
                      t={t}
                      i18nKey="increase-waiter-capacity"
                      defaults="Increase waiter <b>capacity</b> and save <b>cost</b>"
                      components={{ b: <b /> }}
                    />
                  </span>
                </div>
                <div className="is-flex is-flex-direction-row is-align-items-center div-arrow">
                  <Arrow />
                  <span>
                    <Trans
                      t={t}
                      i18nKey="bigger-tips"
                      defaults="Earn bigger <b>tips</b>"
                      components={{ b: <b /> }}
                    />
                  </span>
                </div>
                <div className="is-flex is-flex-direction-row is-align-items-center div-arrow">
                  <Arrow />
                  <span>
                    <Trans
                      t={t}
                      i18nKey="more-returning-customers"
                      defaults="Get more <b>returning</b> customers"
                      components={{ b: <b /> }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="column is-hidden-mobile is-flex is-align-items-center">
              <img
                src="/homepage/image1.webp"
                alt="people sitting around a giant phone that displays a qr code"
                style={{
                  marginTop: 30,
                  marginLeft: 30,
                  boxSizing: 'border-box',
                  width: '90%',
                }}
              />
            </div>
          </div>

          <div
            className="div-header-button"
            style={{ width: '100%', textAlign: 'center', margin: '40px 0' }}
          >
            <Button color="danger" onClick={scrollToWaitlistHead}>
              {t('try-wink', 'Try Wink!')}
            </Button>
          </div>
        </Hero.Body>
      </Hero>

      <Hero className="hero-secondary">
        <Hero.Body>
          <Container>
            <Heading size={3} style={{ fontWeight: 'normal' }}>
              <Trans
                t={t}
                i18nKey="provide-payment-option"
                defaults="Provide a <b>payment</b> option for <b>your customers</b> through a <b>QR code</b> that they <b>love to use</b>!"
                components={{ b: <b /> }}
              />
            </Heading>
          </Container>

          <div
            className="is-flex is-flex-direction-column margin-mobile1"
            style={{ alignItems: 'center', margin: '30px 0 30px 0' }}
          >
            <div className="is-flex is-flex-direction-row is-justify-content-space-evenly">
              <div className="box news-box">
                <img
                  src="/homepage/News_HospitalityTech_edited.webp"
                  alt="Hospitality Tech"
                  style={{
                    boxSizing: 'border-box',
                    margin: 8,
                  }}
                />
                <a
                  href="https://hospitalitytech.com/qr-codes-one-solution-post-covid-19-dine-problem"
                  className="news-font mobile-fontsize has-text-weight-bold"
                >
                  “Solution to the Post-COVID-19 Dine-In Problem”
                </a>
              </div>
              <div className="box news-box">
                <img
                  src="/homepage/abc-news-logo-01.webp"
                  alt="ABC News"
                  style={{
                    boxSizing: 'border-box',
                    margin: 8,
                  }}
                />
                <a
                  href="https://www.abc.net.au/news/2020-10-31/covid-19-check-in-data-using-qr-codes-raises-privacy-concerns/12823432"
                  className="news-font mobile-fontsize has-text-weight-bold"
                >
                  “A golden opportunity for restaurant marketing”
                </a>
              </div>
            </div>
            <div
              className="is-flex is-flex-direction-row is-justify-content-space-evenly"
              style={{ marginTop: 30 }}
            >
              <div className="box news-box">
                <img
                  src="/homepage/BBC-News-logo-jpg.webp"
                  alt="BBC News"
                  style={{
                    boxSizing: 'border-box',
                    margin: 8,
                  }}
                />
                <a
                  href="https://www.bbc.com/news/business-55579480"
                  className="news-font mobile-fontsize has-text-weight-bold"
                >
                  “Covid turbocharged the QR revolution"
                </a>
              </div>
              <div className="box news-box">
                <img
                  src="/homepage/1200px-RTL_Group_edited.webp"
                  alt="RTL Group"
                  style={{
                    boxSizing: 'border-box',
                    margin: 8,
                  }}
                />
                <a
                  href="https://www.rtl.fr/actu/economie-consommation/coronavirus-a-quoi-le-nouveau-moyen-de-paiement-dans-les-restaurants-ressemble-t-il-7900020511"
                  className="news-font mobile-fontsize has-text-weight-bold"
                >
                  “A benefit for the client, waiter and restaurateur”
                </a>
              </div>
            </div>
          </div>
        </Hero.Body>
      </Hero>

      <Hero color="primary">
        <Hero.Body className="mobile-bottompad" style={{ textAlign: 'center' }}>
          <Container>
            <Heading size={3} className="has-text-weight-bold">
              {t('why-wink', 'Why Wink?')}
            </Heading>
          </Container>
          <div
            className="is-flex is-flex-direction-row is-justify-content-space-evenly"
            style={{ alignItems: 'baseline', marginTop: 30, fontSize: '20px' }}
          >
            <div
              className="is-flex is-flex-direction-column mobile-fontsize"
              style={{ alignItems: 'center', textAlign: 'center', margin: 10, flex: 1 }}
            >
              <img src="/homepage/roundabout.webp" alt="" />
              <span className="has-text-weight-bold">
                {t('inc-table-turnover', 'Increase Table Turnover')}
              </span>
              <span>{t('save-15-mins', 'Save up to 15 minutes per table')}</span>
            </div>
            <div
              className="is-flex is-flex-direction-column mobile-fontsize"
              style={{ alignItems: 'center', textAlign: 'center', margin: 10, flex: 1 }}
            >
              <img src="/homepage/positive-vote.webp" alt="" />
              <span className="has-text-weight-bold">
                {t('waiter-capacity-up', 'Waiter capacity - UP!')}
              </span>
              <span>
                {t(
                  'waiters-time-on-payment',
                  'Waiters spend 1/3 of the time on payments. Eliminate that!'
                )}
              </span>
            </div>
          </div>
          <div
            className="is-flex is-flex-direction-row is-justify-content-space-evenly"
            style={{ alignItems: 'baseline', marginTop: 30, fontSize: '20px' }}
          >
            <div
              className="is-flex is-flex-direction-column mobile-fontsize"
              style={{ alignItems: 'center', textAlign: 'center', margin: 10, flex: 1 }}
            >
              <img src="/homepage/money-bag.webp" alt="" />
              <span className="has-text-weight-bold">{t('bigger-tips-title', 'Bigger tips')}</span>
              <span>
                {t('nudge-customers-tip-more', 'Successfully nudge customers to tip more')}
              </span>
            </div>
            <div
              className="is-flex is-flex-direction-column mobile-fontsize"
              style={{ alignItems: 'center', textAlign: 'center', margin: 10, flex: 1 }}
            >
              <img src="/homepage/customer.webp" alt="" />
              <span className="has-text-weight-bold">
                {t('happy-customers', 'Happy customers')}
              </span>
              <span>
                {t(
                  'no-waiting-at-the-end',
                  'No more waiting at the end to pay and get better service on waiter time freed'
                )}
              </span>
            </div>
          </div>
          <div
            className="is-flex is-flex-direction-row is-justify-content-space-evenly"
            style={{ alignItems: 'baseline', marginTop: 30, fontSize: '20px' }}
          >
            <div
              className="is-flex is-flex-direction-column mobile-fontsize"
              style={{ alignItems: 'center', textAlign: 'center', margin: 10, flex: 1 }}
            >
              <img src="/homepage/piggy-bank.webp" alt="" />
              <span className="has-text-weight-bold">{t('save-more', 'Save More')}</span>
              <span>
                {t('save-on-transaction-fees', 'Save on transaction fees and staff cost')}
              </span>
            </div>
          </div>
          <Container>
            <Heading size={1} className="has-text-weight-bold" style={{ marginTop: 30 }}>
              {t('more-orders-happier-customers', 'More Orders & Happier Customers!')}
            </Heading>
            <Heading subtitle style={{ marginTop: 10 }}>
              <i>
                <Trans
                  t={t}
                  i18nKey="research-shows-customers"
                  defaults="Research shows that <b>80%</b> of customers use it where its available."
                  components={{ b: <b /> }}
                />
              </i>
            </Heading>
            <div style={{ width: '100%', textAlign: 'center', margin: '40px 0' }}>
              <Button color="danger" onClick={scrollToWaitlistHead}>
                {t('try-wink', 'Try Wink!')}
              </Button>
            </div>
          </Container>
        </Hero.Body>
      </Hero>

      <Hero className="hero-secondary">
        <Hero.Body>
          <Container>
            <Heading size={3} className="has-text-centered has-text-weight-bold">
              {t('how-it-works', 'How it works')}
            </Heading>
          </Container>

          <Container style={{ marginTop: 30 }}>
            <Heading size={4} className="has-text-centered has-text-weight-semibold">
              {t('for-restaurant-owners', 'For restaurant owners')}
            </Heading>
          </Container>

          <div className="columns is-flex-direction-row" style={{ marginTop: 20 }}>
            <div className="column has-text-centered is-flex is-flex-direction-column">
              <i className="fas fa-link" style={{ margin: 10, fontSize: '5rem' }}></i>
              <span>{t('easy-onboarding', 'Easy onboarding - connect your POS')}</span>
            </div>

            <div className="column has-text-centered is-flex is-flex-direction-column">
              <i className="fas fa-qrcode" style={{ margin: 10, fontSize: '5rem' }}></i>
              <span>{t('put-qr-codes-tables', 'Put QR codes on your tables')}</span>
            </div>

            <div className="column has-text-centered is-flex is-flex-direction-column">
              <i className="fas fa-money-check-alt" style={{ margin: 10, fontSize: '5rem' }}></i>
              <span>
                {t(
                  'ready-for-more-sales',
                  '...and you are now ready for more sales and lower costs'
                )}
              </span>
            </div>
          </div>

          <Container style={{ marginTop: 30 }}>
            <Heading size={4} className="has-text-centered has-text-weight-semibold">
              {t('for-restaurant-guests', 'For restaurant guests')}
            </Heading>
          </Container>

          <div className="columns is-flex-direction-row" style={{ marginTop: 20 }}>
            <div className="column has-text-centered is-flex is-flex-direction-column">
              <i className="fas fa-qrcode" style={{ margin: 10, fontSize: '5rem' }}></i>
              <span>{t('scan-qr-code-table', 'Scan the QR code on your table')}</span>
            </div>

            <div className="column has-text-centered is-flex is-flex-direction-column">
              <i className="fas fa-coins" style={{ margin: 10, fontSize: '5rem' }}></i>
              <span>{t('add-a-tip', 'Add a tip 😉')}</span>
            </div>

            <div className="column has-text-centered is-flex is-flex-direction-column">
              <i className="fas fa-mobile-alt" style={{ margin: 10, fontSize: '5rem' }}></i>
              <span>
                {t(
                  'pay-with-phone-noapp',
                  'Pay with your phone (no app download needed). That easy and fast!'
                )}
              </span>
            </div>
          </div>
        </Hero.Body>
      </Hero>

      <Heading id="heading-waitlist" style={{ textAlign: 'center', margin: 30 }}>
        <span className="has-text-weight-bold" style={{ color: '#4F3CEB', fontSize: '35px' }}>
          {t('get-in-touch', 'Get in touch with us!')}
        </span>
      </Heading>

      <HomeWaitlistForm />

      <HomeFooter />
    </div>
  );
};

export default Home;

const Arrow: React.FC = () => (
  <img
    src="/homepage/arrow.svg"
    alt="arrow"
    style={{
      width: 60,
      height: 39,
      marginRight: 20,
      transform: 'rotate(42.56773356661023deg)',
      filter:
        'invert(21%) sepia(92%) saturate(2579%) hue-rotate(241deg) brightness(91%) contrast(103%)',
    }}
  />
);
