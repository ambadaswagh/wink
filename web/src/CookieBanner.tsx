import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routes from './services/routes';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CookieConsent
      buttonText={t('cookie-banner-accept', 'I agree')}
      containerClasses="cookie-banner"
      disableStyles
    >
      {t(
        'cookie-banner',
        'We use cookies to provide an excellent experience to our users. By using this website you give your consent to the usage of cookies.'
      )}
      <br />
      <Trans
        i18nKey="cookie-banner-policy-link"
        defaults="Further information about the usage of cookies can be found in the <a>data privacy statement</a>."
        components={{ a: <Link to={routes.privacyPolicy} /> }}
      />
    </CookieConsent>
  );
};

export default CookieBanner;
