import { logout } from '../services/auth';
import { history } from '../services/routes';

const Logout: React.FC = () => {
  logout();
  history.replace('/');
  return null;
};

export default Logout;
