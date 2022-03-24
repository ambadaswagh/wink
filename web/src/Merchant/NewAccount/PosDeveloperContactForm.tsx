import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { Button, Card, Form, Heading, Notification, Section } from 'react-bulma-components';

import useScrollTop from '../../hooks/useScrollTop';
import { api, apiUri } from '../../services/api';
import { getLocalUser } from '../../services/auth';

const emailRegexp = new RegExp(/^\S+@\S+\.\S{2,}/); // just basic sanity check

const PosDeveloperContactForm: React.FC<PosDeveloperContactFormProps> = ({ onBack }) => {
  const localUser = getLocalUser();
  if (!localUser) throw Error('User not logged in');

  useScrollTop();
  const [contactInfo, setContactInfo] = useState<ContactInfoDataPosDev>({
    name: localUser.profile.name,
    website: '',
    email: localUser.profile.email,
    clientCount: '',
    connectivity: '',
    operatingSystems: [],
    notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>();

  const changeState: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = useCallback((e) => {
    const { value, name } = e.target;
    setContactInfo((contactInfo) => ({
      ...contactInfo,
      [name]: value,
    }));
  }, []);
  const handleChangeOS: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, name } = e.target;
    setContactInfo((contactInfo) => ({
      ...contactInfo,
      operatingSystems: checked
        ? contactInfo.operatingSystems?.filter((o) => o !== name).concat(name)
        : contactInfo.operatingSystems?.filter((o) => o !== name),
    }));
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!contactInfo.name) return setError('Name is a required field');
    if (!contactInfo.email) return setError('Email is a required field');
    if (!contactInfo.connectivity)
      return setError('The type of solution (cloud or not) is a required field');

    setSaving(true);
    const success = await api.post<ApiResponse>(apiUri('contact/getdata'), {
      form: 'posdev',
      formData: contactInfo,
    });
    setSaving(false);
    if (success.data.message !== 'ok') {
      setError(success.data.message);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section>
        <Card>
          <Card.Content>
            Your information has been received. We will review it and contact you shortly.
          </Card.Content>
        </Card>
      </Section>
    );
  }

  const operatingSystems = contactInfo.operatingSystems || [];

  return (
    <Section>
      <Card>
        <Card.Content>
          <Heading size={5}>POS Developer Contact Form</Heading>
          <p>Thank you for your interest in partnering with Wink!</p>
          <p>Please complete the form below to request your API key and documentation.</p>
          {error && (
            <Notification color="danger">
              <Button remove onClick={() => setError(undefined)} />
              {error}
            </Notification>
          )}
          <form onSubmit={submitForm} style={{ marginTop: 20 }}>
            <Form.Field>
              <Form.Label>Name</Form.Label>
              <Form.Input
                className={clsx('input', !contactInfo.name && 'is-danger')}
                type="text"
                placeholder="Name"
                name="name"
                value={contactInfo.name}
                onChange={changeState}
                required
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Website</Form.Label>
              <Form.Input
                className="input"
                type="text"
                placeholder="Website"
                name="website"
                value={contactInfo.website}
                onChange={changeState}
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Email</Form.Label>
              <Form.Input
                className={clsx('input', !contactInfo.email?.match(emailRegexp) && 'is-danger')}
                type="email"
                placeholder="Email"
                name="email"
                value={contactInfo.email}
                onChange={changeState}
                required
              />
            </Form.Field>

            <Form.Field>
              <Form.Label>Approximately how many restaurants use your POS?</Form.Label>
              <Form.Select
                name="clientCount"
                value={contactInfo.clientCount}
                onChange={changeState}
              >
                <option>Choose one...</option>
                <option value="one">Just one</option>
                <option value="few">A few</option>
                <option value="dozens">Dozens</option>
                <option value="hundreds">Hundreds</option>
                <option value="thousands">Thousands</option>
                <option value="more">Tens of thousands (or more)</option>
              </Form.Select>
            </Form.Field>

            <Form.Field>
              <Form.Label>Is your POS solution cloud-based?</Form.Label>
              <Form.Select
                name="connectivity"
                value={contactInfo.connectivity}
                onChange={changeState}
              >
                {!contactInfo.connectivity && <option>Choose one...</option>}
                <option value="on-premises">
                  No, solution is on-premises, main POS is in the restaurant network
                </option>
                <option value="cloud">Yes, all restaurants communicate to a central server</option>
                <option value="other">Hybrid / Other</option>
              </Form.Select>
            </Form.Field>

            {(contactInfo.connectivity === 'on-premises' ||
              contactInfo.connectivity === 'other') && (
              <Form.Field>
                <Form.Label>
                  On which operating systems does your software run?
                  <br />
                  <span style={{ fontSize: 'small', fontWeight: 400, color: '#777' }}>
                    Check all that apply
                  </span>
                </Form.Label>
                <Form.Label style={{ fontWeight: 400 }}>
                  <Form.Checkbox
                    name="win"
                    onChange={handleChangeOS}
                    checked={!!~operatingSystems.indexOf('win')}
                  />{' '}
                  Windows
                </Form.Label>
                <Form.Label style={{ fontWeight: 400 }}>
                  <Form.Checkbox
                    name="linux"
                    onChange={handleChangeOS}
                    checked={!!~operatingSystems.indexOf('linux')}
                  />{' '}
                  Linux
                </Form.Label>
                <Form.Label style={{ fontWeight: 400 }}>
                  <Form.Checkbox
                    name="mac"
                    onChange={handleChangeOS}
                    checked={!!~operatingSystems.indexOf('mac')}
                  />{' '}
                  MacOS
                </Form.Label>
                <Form.Label style={{ fontWeight: 400 }}>
                  <Form.Checkbox
                    name="ios"
                    onChange={handleChangeOS}
                    checked={!!~operatingSystems.indexOf('ios')}
                  />{' '}
                  iOS
                </Form.Label>
                <Form.Label style={{ fontWeight: 400 }}>
                  <Form.Checkbox
                    name="android"
                    onChange={handleChangeOS}
                    checked={!!~operatingSystems.indexOf('android')}
                  />{' '}
                  Android
                </Form.Label>
                <Form.Label style={{ fontWeight: 400 }}>
                  <Form.Checkbox
                    name="other"
                    onChange={handleChangeOS}
                    checked={!!~operatingSystems.indexOf('other')}
                  />{' '}
                  Other
                </Form.Label>
              </Form.Field>
            )}

            <Form.Field>
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Textarea name="notes" value={contactInfo.notes} onChange={changeState} />
            </Form.Field>

            <div className="has-text-centered" style={{ width: '100%', margin: '40px 0' }}>
              <Button onClick={onBack} style={{ marginRight: 20 }}>
                Back
              </Button>
              <Button color="primary" disabled={saving}>
                Request Developer Access
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </Section>
  );
};

export default PosDeveloperContactForm;

interface PosDeveloperContactFormProps {
  onBack: () => void;
}
