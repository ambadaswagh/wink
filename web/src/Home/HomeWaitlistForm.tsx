import React, { useState } from 'react';
import { Button, Container, Form, Heading, Notification } from 'react-bulma-components';
import { useTranslation } from 'react-i18next';

import { api, apiUri } from '../services/api';

const HomeWaitlistForm: React.FC = () => {
  const { t } = useTranslation('merchant');

  const [contactInfo, setContactInfo] = useState<ContactInfoDataWaitlist>({
    clientName: '',
    restaurantName: '',
    email: '',
    phone: '',
    postalCode: '',
    pos: '',
    posAlt: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ error: false, message: '' });

  const changeState: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { value, name } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await api
      .post<ApiResponse>(apiUri('contact/getdata'), {
        form: 'waitlist',
        formData: contactInfo,
      })
      .then((resp) => resp.data);
    if (ok.message !== 'ok') {
      setFormStatus({ error: true, message: 'Submission failed: ' + ok.message });
    } else {
      setFormStatus({
        error: false,
        message: 'Your information has been received. We will review it and contact you shortly.',
      });
    }
    setSubmitting(false);
  };

  return (
    <div id="div-waitlist" className="columns div-waitlist-form" style={{ margin: 10 }}>
      <div className="column is-flex is-flex-direction-column">
        <div className="div-waitlist-form-sub">
          <Container>
            <Heading subtitle style={{ margin: '30px 0 30px 0' }}>
              <span style={{ fontSize: '25px' }}>
                {t('fill-out-quick-form', 'Fill out this quick contact form.')}
              </span>
              <br></br>
              <span style={{ fontSize: '12px' }}>
                {t('get-back-24hs', 'We will get back to you within 24 hours!')}
              </span>
            </Heading>
          </Container>
        </div>

        {formStatus.message && (
          <Notification color={formStatus.error ? 'danger' : 'success'}>
            <Button remove onClick={() => setFormStatus({ error: false, message: '' })} />
            {formStatus.message}
          </Notification>
        )}

        <form onSubmit={submitForm}>
          <Form.Field>
            <Form.Label>{t('name', 'Name')}</Form.Label>
            <input
              className="input"
              type="text"
              placeholder={`${t('your-name', 'Your Name')}*`}
              name="clientName"
              value={contactInfo.clientName}
              onChange={changeState}
              required
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>{t('restaurant-name', 'Restaurant Name')}</Form.Label>
            <input
              className="input"
              type="text"
              placeholder={`${t('restaurant-name', 'Restaurant Name')}`}
              name="restaurantName"
              value={contactInfo.restaurantName}
              onChange={changeState}
            />
          </Form.Field>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <input
              className="input"
              type="email"
              placeholder={t('your-email', 'Your Email')}
              name="email"
              value={contactInfo.email}
              onChange={changeState}
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>{t('phone', 'Phone')}</Form.Label>
            <input
              className="input"
              type="tel"
              placeholder={`${t('your-phone', 'Your phone')}*`}
              name="phone"
              value={contactInfo.phone}
              onChange={changeState}
              required
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>{t('postal-code', 'Postal Code')}</Form.Label>
            <input
              className="input"
              type="text"
              placeholder={`${t('postal-code', 'Postal Code')}*`}
              name="postalCode"
              value={contactInfo.postalCode}
              onChange={changeState}
              required
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>{t('pos-selection', 'POS Selection')}</Form.Label>
            <div className="control">
              <div className="select">
                <select name="pos" value={contactInfo.pos} onChange={changeState} required>
                  <option value="">Your POS system</option>
                  <option>Lightspeed</option>
                  <option>Gastrofix</option>
                  <option>Vectron</option>
                  <option>Ready2order</option>
                  <option>roc.Kasse</option>
                  <option>Gastronovi</option>
                  <option>Orderbird</option>
                  <option>Cukcuk</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </Form.Field>
          {contactInfo.pos === 'Other' && (
            <Form.Field>
              <Form.Label>{t('pos-selection', 'POS Selection')}</Form.Label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder={`${t('your-pos', 'Your POS')}*`}
                  name="posAlt"
                  value={contactInfo.posAlt}
                  onChange={changeState}
                  required
                />
              </div>
            </Form.Field>
          )}

          <div style={{ width: '100%', textAlign: 'center', margin: '40px 0' }}>
            <Button color="danger" disabled={submitting} className={submitting ? 'is-loading' : ''}>
              {t('submit', 'Submit')}
            </Button>
          </div>
        </form>
      </div>
      <div className="column is-flex is-justify-content-center is-align-items-center">
        <img src="/homepage/216.webp" alt="" style={{ height: 'fit-content' }} />
      </div>
    </div>
  );
};

export default HomeWaitlistForm;
