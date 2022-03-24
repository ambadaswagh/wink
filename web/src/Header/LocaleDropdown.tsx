import clsx from 'clsx';
import { Dropdown } from 'react-bulma-components';

import i18n, { availableLocales } from '../services/i18n';
import classes from './Header.module.scss';

const LocaleDropdown: React.FC<LocaleDropdownProps> = ({ backColor }) => {
  const locale = availableLocales.find((l) => l.locale === i18n.language);

  // The <div> around <Dropdown> is needed otherwise in some pages a space happens between the button
  // and the dropdown menu
  return (
    <div>
      <Dropdown
        icon={<img src={`/flags/${locale?.flag}.png`} alt={`${locale?.flagAlt} flag`} />}
        label={true}
        color={backColor}
        right
        className={classes.languageSelector}
      >
        {availableLocales.map((l) => (
          <Dropdown.Item
            key={l.locale}
            renderAs="a"
            textAlign="right"
            value={l.locale}
            onMouseUp={() => i18n.changeLanguage(l.locale)}
            className={clsx(l.locale === locale?.locale && classes.selected)}
          >
            <img src={`/flags/${l.flag}.png`} alt={`${l.flagAlt} flag`} />
            {l.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default LocaleDropdown;

interface LocaleDropdownProps {
  backColor?: string;
}
