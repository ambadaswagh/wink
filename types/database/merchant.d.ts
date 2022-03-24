interface MerchantRow {
  merchantId: string; // [0-9a-f]{24}
  name: string;
  contact: BusinessContact; // headquarters
  defaultLocale: WinqLocale;
  servicePointDenomination: ServicePointDenomination;
  stripeAccount?: StripeAccount;
  paypalSomethingId?: string;
  enabledPaymentTypes: string[];
  currencyId: string;
  status: 'WAITLIST' | 'ACTIVE' | 'SUSPENDED';
}

interface ServiceLocationRow<T = PosParameters> {
  serviceLocationId: string; // [0-9a-f]{24}
  merchantId: string; // FK
  name: string;
  contact: BusinessContact; // restaurant
  servicePointDenomination: ServicePointDenomination; // sync or override Merchant
  stripeAccount?: StripeAccount; // kept in sync with Merchant
  currencyId: string; // kept in sync with Merchant
  posSystemId: string;
  posParameters: T;
  posData?: unknown;
}

interface ServicePointRow {
  servicePointId: string; // {serviceLocationId}/[0-9a-f]{8}, first part used as FK
  posReference: string;
  name: string;
}

interface BusinessContact {
  legalName: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryId: string;
  phoneNumber?: string;
  businessEmail?: string;
  website?: string;
  taxId?: string; // VAT
}

interface StripeAccount {
  accountId: string;
  creationTs: number;
  activationStatus: 'PENDING' | 'ACTIVE'; // todo: add ERROR status
  activationTs?: number;
}
