import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import routes from '../services/routes';

const DePrivacyPolicy = lazy(() => import('./DePrivacyPolicy'));
const EnPrivacyPolicy = lazy(() => import('./EnPrivacyPolicy'));

const PrivacyPolicy: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <section style={{ marginBottom: 30 }}>
      <Header />
      {i18n.language === 'en' && <EnPrivacyPolicy />}
      {i18n.language === 'de' && <DePrivacyPolicy />}
      <Link to={routes.home}>Back to Home</Link>
    </section>
  );
};
export default PrivacyPolicy;
