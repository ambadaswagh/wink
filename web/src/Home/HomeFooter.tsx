import React from 'react';
import { Footer } from 'react-bulma-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routes from '../services/routes';

const HomeFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Footer className="is-justify-content-space-between is-flex">
      <span>Copyright &copy; ARC Solutions GmbH</span>
      <Link to={routes.aboutUs}>{t('impressum-title')}</Link>
      <Link to={routes.privacyPolicy}>{t('privacy-policy')}</Link>
    </Footer>
  );
};

export default HomeFooter;
