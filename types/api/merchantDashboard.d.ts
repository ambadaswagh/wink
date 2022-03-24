interface ApiGetMerchantDashboard extends ApiResponse {
  merchantUser: MerchantUser;
  merchants: Merchant[];
  availableCurrencies: Currency[];
  availableCountries: Country[];
}

interface ApiPostStripeConnectAccountRequest {
  merchantId: string;
}

interface ApiPutStripeAccountStatus {
  merchantId: string;
}

interface ApiPostStripeConnectAccountResponse extends ApiResponse {
  accountActivationLink: string;
}
