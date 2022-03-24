import clsx from 'clsx';
import { Hero, Menu } from 'react-bulma-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getLocalUser } from '../services/auth';
import routes from '../services/routes';
import { fullUrl } from '../services/web';
import classes from './Header.module.scss';
import LocaleDropdown from './LocaleDropdown';

const Header: React.FC = () => {
  const { t } = useTranslation('merchant');

  const cbUrl = fullUrl(routes.authLogin);
  const loginUrl = `https://auth.winkapp.me/login?client_id=7pcj5b2p6b5tl9gipjan7veppl&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${cbUrl}`;
  const user = getLocalUser();

  const isHome = window.location.pathname === routes.home;
  const logo = <img src="/wink.webp" alt="Wink Logo" className={clsx(isHome && classes.logo)} />;

  return (
    <Hero.Header display="flex" style={{ justifyContent: 'space-between' }}>
      {isHome ? (
        logo
      ) : (
        <Link to={routes.home} className={classes.logo}>
          {logo}
        </Link>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        {!user ? (
          <>
            <Menu.List>
              <a href={loginUrl}>{t('merchant:login', 'Login')}</a>
            </Menu.List>
            <Menu.List>
              <a href={loginUrl}>{t('merchant:signup', 'Sign-up')}</a>
            </Menu.List>
          </>
        ) : (
          <>
            <Menu.List>
              <Link to={routes.dashboard}>{t('merchant:dashboard', 'Dashboard')}</Link>
            </Menu.List>
            <Menu.List>
              <Link to={routes.authLogout}>{t('merchant:logout', 'Logout')}</Link>
            </Menu.List>
          </>
        )}
        <LocaleDropdown backColor="primary" />
      </div>
    </Hero.Header>
  );
};

export default Header;
