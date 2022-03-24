import { config } from '@libs/config';
import { computeOrderTotal } from '@libs/orderUtils';
import { Stripe } from 'stripe';
import { URLSearchParams } from 'url';

const stripe = new Stripe(config.stripe.key, {
  apiVersion: '2020-08-27',
  typescript: true,
});

const createExpressAccount = (): Promise<Stripe.Response<Stripe.Account>> => {
  return stripe.accounts.create({
    country: 'DE',
    type: 'express',
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
  });
};

const createAccountOnboardingLink = (
  stripeAccountId: string,
  merchantId: string
): Promise<Stripe.Response<Stripe.AccountLink>> => {
  const { host } = config.domain;
  const encodedMerchantId = encodeURIComponent(merchantId);
  return stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${host}/stripe-account-onboarding/refresh/${encodedMerchantId}`,
    return_url: `${host}/stripe-account-onboarding/return/${encodedMerchantId}`,
    type: 'account_onboarding',
  });
};

const retrieveAccount = (stripeAccountId: string): Promise<Stripe.Response<Stripe.Account>> => {
  return stripe.accounts.retrieve(stripeAccountId);
};

const createCheckoutSession = ({
  userId,
  merchantId,
  servicePointId,
  waiter,
  stripeAccountId,
  items,
  locale,
}: CreateCheckoutSessionRequest): Promise<Stripe.Response<Stripe.Checkout.Session>> => {
  const totalCharge = computeOrderTotal(items);
  const comission = Math.round(totalCharge) / 100; // we charge 1%
  const cancelQs = new URLSearchParams({ servicePointId }).toString();
  const successQs = new URLSearchParams({ userId }).toString();
  const metadata: SessionMetadata = {
    merchantId,
    servicePointId,
    waiter: waiter || null,
  };

  const params: Stripe.Checkout.SessionCreateParams = {
    cancel_url: config.domain.host + `/r/${cancelQs}`,
    success_url: config.domain.host + `/cb/paid?${successQs}`,
    billing_address_collection: 'auto',
    client_reference_id: `${userId}/${merchantId}/${servicePointId}`,
    line_items: items.map((i) => ({
      name: i.description,
      quantity: i.quantity,
      amount: toStripePrice(i.unitPrice),
      currency: 'EUR',
    })),
    payment_intent_data: {
      application_fee_amount: toStripePrice(comission),
    },
    mode: 'payment',
    payment_method_types: ['card'],
    locale: (locale && validLocales[locale]) || 'auto',
    metadata,
  };

  const options: Stripe.RequestOptions = {
    stripeAccount: stripeAccountId,
  };

  return stripe.checkout.sessions.create(params, options);
};

const getCheckoutSession = async (
  stripeAccount: string,
  checkoutSessionId: string
): Promise<Order | undefined> => {
  const session = await stripe.checkout.sessions.retrieve(
    checkoutSessionId,
    { expand: ['line_items'] },
    { stripeAccount }
  );
  if (!session?.metadata) return;
  const metadata = session.metadata as SessionMetadata;

  return {
    items:
      session.line_items?.data.map((i) => ({
        orderItemId: '',
        modifiers: [],
        payable: true,
        description: i.description,
        quantity: i.quantity || 0,
        unitPrice: (i.price?.unit_amount || 0) / 100,
        currency: i.currency,
      })) || [],
    lastUpdateTs: 0,
    servicePointId: metadata.servicePointId || '',
    waiter: metadata.waiter || undefined,
  };
};

const StripeClient = {
  createExpressAccount,
  createAccountOnboardingLink,
  retrieveAccount,
  createCheckoutSession,
  getCheckoutSession,
};

export default StripeClient;

interface SessionMetadata extends Stripe.MetadataParam {
  merchantId: string;
  servicePointId: string;
  waiter: string | null;
}

export interface CreateCheckoutSessionRequest {
  userId: string;
  merchantId: string;
  servicePointId: string;
  waiter?: string;
  stripeAccountId: string;
  items: Array<CheckoutItem>;
  locale?: string;
}

export interface CheckoutItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

const toStripePrice = (price: number) => Math.round(price * 100);

const validLocales: Record<string, Stripe.Checkout.SessionCreateParams.Locale> = {
  bg: 'bg',
  cs: 'cs',
  da: 'da',
  de: 'de',
  el: 'el',
  en: 'en',
  'en-GB': 'en-GB',
  es: 'es',
  'es-419': 'es-419',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  'fr-CA': 'fr-CA',
  hu: 'hu',
  id: 'id',
  it: 'it',
  ja: 'ja',
  lt: 'lt',
  lv: 'lv',
  ms: 'ms',
  mt: 'mt',
  nb: 'nb',
  nl: 'nl',
  pl: 'pl',
  pt: 'pt',
  'pt-BR': 'pt-BR',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  sv: 'sv',
  th: 'th',
  tr: 'tr',
  zh: 'zh',
  'zh-HK': 'zh-HK',
  'zh-TW': 'zh-TW',
};
