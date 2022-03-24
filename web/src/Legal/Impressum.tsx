import { Content } from 'react-bulma-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import useScrollTop from '../hooks/useScrollTop';
import i18n from '../services/i18n';
import routes from '../services/routes';

const Impressum: React.FC = () => {
  const { t: t1 } = useTranslation();
  const { t } = useTranslation('merchant');
  useScrollTop();

  return (
    <section>
      <Header />
      <Content style={{ marginBottom: 30 }}>
        <h1 className="title is-1" style={{ marginTop: 30 }}>
          {t1('impressum-title', 'About Us')}
        </h1>
        <h2 className="title is-6">
          {t('impressum-information-title', 'Information according to paragraph 5 TMG')}
        </h2>
        <p>
          ARC Solutions GmbH
          <br />
          Novalisstra&szlig;e 10
          <br />
          c/o Antler
          <br />
          10115 Berlin
        </p>
        <p>
          <strong>{t('impressum-represented-by', 'Represented by:')}</strong>
          <br />
          Cyrus Acla
          <br />
          Timur Csillik
          <br />
          Robert Rode
        </p>
        <h2 className="title is-6">{t('impressum-contact-title', 'Contact')}</h2>
        <p>
          {t('impressum-phone', 'Phone:')} <a href="tel:+4917621258371">+49 17621258371</a>
          <br />
          {t('impressum-email', 'Email:')} <a href="mailto:info@winkapp.me">info@winkapp.me</a>
        </p>
        <h2 className="title is-6">
          {t('impressum-responsible-content', 'Responsible for journalistic-editorial content:')}
        </h2>
        <p>
          Cyrus Acla
          <br />
          Novalisstra&szlig;e 10
          <br />
          10115 Berlin
        </p>
        {i18n.language === 'de' && (
          <>
            <h2 className="title is-6">EU-Streitschlichtung</h2>
            <p>
              Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <h2 className="title is-6">
              Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </>
        )}
        {i18n.language === 'en' && (
          <>
            <h2 className="title is-6">EU dispute settlement</h2>
            <p>
              The European Commission provides a platform for online dispute resolution:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .<br />
              You can find our email address in the legal notice above.
            </p>

            <h2 className="title is-6">
              Consumer dispute settlement / universal arbitration board
            </h2>
            <p>
              We are neither willing nor obliged to participate in dispute settlement proceedings
              before a consumer arbitration board.
            </p>
          </>
        )}
        <p className="is-size-7">
          {t('impressum-source', 'Source')} <a href="https://www.e-recht24.de">e-recht24.de</a>
        </p>
        <Link to={routes.home}>Back to Home</Link>
      </Content>
    </section>
  );
};

export default Impressum;
