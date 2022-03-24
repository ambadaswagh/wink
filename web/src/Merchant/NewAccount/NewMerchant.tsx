import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { Button, Card, Form, Heading, Notification, Section } from 'react-bulma-components';

import useScrollTop from '../../hooks/useScrollTop';
import { api, apiUri } from '../../services/api';
import { getApiConfig, getLocalUser } from '../../services/auth';
import { fetchDashboardData } from '../../services/contexts/user';
import i18n from '../../services/i18n';

const emailRegexp = new RegExp(/^\S+@\S+\.\S{2,}/); // just basic sanity check

const NewMerchant: React.FC<NewMerchantProps> = ({ onBack }) => {
  const localUser = getLocalUser();
  if (!localUser) throw Error('User not logged in');

  useScrollTop();
  const [startedTyping, setStartedTyping] = useState(false);
  const [merchant, setMerchant] = useState<MerchantRow>(getMerchantInitialValue);
  const [contact, setContact] = useState<BusinessContact>(() =>
    getContactInitialValue(localUser.profile.email)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  const saveProgress = () => {
    localStorage.setItem('wink.form.newMerchant.merchant', JSON.stringify(merchant));
    localStorage.setItem('wink.form.newMerchant.contact', JSON.stringify(contact));
  };

  const changeMerchant: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = useCallback((e) => {
    const { value, name } = e.target;
    setMerchant((merchant) => ({
      ...merchant,
      [name]: value,
    }));
    setStartedTyping(true);
  }, []);
  const changeContact: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = useCallback(
    (e) => {
      const { value, name } = e.target;
      setContact((contact) => ({
        ...contact,
        [name]: value,
      }));
    },
    []
  );

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!merchant.name) return setError('Name is a required field');
    if (!contact.legalName) return setError('Company name is a required field');

    setSaving(true);
    const success = await api.post<ApiResponse>(
      apiUri('merchants'),
      {
        merchant: Object.assign({}, merchant, { contact, merchantId: undefined }),
      },
      getApiConfig()
    );
    if (success.data.message !== 'OK') {
      setSaving(false);
      setError(success.data.message);
      return;
    }
    await fetchDashboardData().catch((err) => {
      setError(err.message);
      setSaving(false);
    });
  };

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading size={5}>You’re in the right place!</Heading>
          <p>Thank you for your interest in using Wink in your establishment!</p>
          <p>
            Let’s get some information about your business. Don’t worry, any information you enter
            here can be updated later. For example, if you have multiple locations, you will have
            the option to add more locations once your account is created.
          </p>
          {error && (
            <Notification color="danger">
              <Button remove onClick={() => setError(undefined)} />
              {error}
            </Notification>
          )}
          <form onSubmit={submitForm} style={{ marginTop: 20 }}>
            <Form.Field>
              <Form.Label>Restaurant Name*</Form.Label>
              <Form.Input
                className={clsx('input', startedTyping && !merchant.name && 'is-danger')}
                type="text"
                placeholder="Name used in marketing material"
                name="name"
                value={merchant.name}
                onChange={changeMerchant}
                onBlur={saveProgress}
                required
                autoFocus
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Company Name*</Form.Label>
              <Form.Input
                className="input"
                type="text"
                placeholder="Full legal name of the entity"
                name="legalName"
                value={contact.legalName}
                onChange={changeContact}
                onBlur={saveProgress}
                required
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Address</Form.Label>
              <Form.Input
                className="input"
                type="text"
                name="address"
                value={contact.address}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>City</Form.Label>
              <Form.Input
                className="input"
                type="text"
                name="city"
                value={contact.city}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>State/Province</Form.Label>
              <Form.Input
                className="input"
                type="text"
                name="state"
                value={contact.state}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Postal Code</Form.Label>
              <Form.Input
                className="input"
                type="text"
                name="postalCode"
                value={contact.postalCode}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="countryId"
                value={contact.countryId}
                onChange={changeContact}
                onBlur={saveProgress}
              >
                <option value="at">Austria</option>
                <option value="be">Belgium</option>
                <option value="de">Germany</option>
                <option value="it">Italy</option>
                <option value="ld">Netherlands</option>
                <option value="pl">Poland</option>
                <option value="ch">Switzerland</option>
                <option disabled>───── Other ─────&nbsp;&nbsp;</option>
                <option value="_eu">Other EU Country</option>
                <option value="_other">Non-EU Country</option>
              </Form.Select>
            </Form.Field>

            <Form.Field>
              <Form.Label>Office Phone Number</Form.Label>
              <Form.Input
                className="input"
                type="text"
                placeholder="Where you can be reached"
                name="phoneNumber"
                value={contact.phoneNumber}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Business Email Address</Form.Label>
              <Form.Input
                className={clsx(
                  'input',
                  contact.businessEmail && !contact.businessEmail.match(emailRegexp) && 'is-danger'
                )}
                type="text"
                name="businessEmail"
                value={contact.businessEmail}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Company Website</Form.Label>
              <Form.Input
                className="input"
                type="text"
                name="website"
                value={contact.website}
                onChange={changeContact}
                onBlur={saveProgress}
              />
            </Form.Field>

            <div className="has-text-centered" style={{ width: '100%', margin: '40px 0' }}>
              <Button onClick={onBack} style={{ marginRight: 20 }}>
                Cancel
              </Button>
              <Button color="primary" disabled={saving}>
                Save
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </Section>
  );
};

export default NewMerchant;

const getMerchantInitialValue = () => {
  const savedProgress = localStorage.getItem('wink.form.newMerchant.merchant');
  if (savedProgress) {
    try {
      return JSON.parse(savedProgress);
    } catch {
      /* */
    }
  }
  return {
    merchantId: '', // will be created in the backend
    name: '',
    contact: { countryId: 'de', legalName: '' }, // we will replace it before sending to the backend
    defaultLocale: i18n.language as WinqLocale,
    servicePointDenomination: {
      singular: 'Table',
      plural: 'Tables',
    },
    enabledPaymentTypes: ['card'],
    currencyId: 'EUR',
    status: 'WAITLIST',
  };
};

const getContactInitialValue = (businessEmail: string) => {
  const savedProgress = localStorage.getItem('wink.form.newMerchant.contact');
  if (savedProgress) {
    try {
      return JSON.parse(savedProgress);
    } catch {
      /* */
    }
  }
  return {
    countryId: 'de',
    legalName: '',
    address: '',
    businessEmail,
    website: '',
    city: '',
    phoneNumber: '',
    postalCode: '',
    state: '',
    taxId: '',
  };
};

interface NewMerchantProps {
  onBack: () => void;
}
