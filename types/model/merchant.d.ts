// Top-down object: this is part of a full description of a Merchant
interface Merchant extends MerchantRow {
  serviceLocations: ServiceLocation[];
}

// Top-down object: this is part of a full description of a Merchant
interface ServiceLocation extends ServiceLocationRow {
  servicePoints: ServicePointRow[];
}

// Bottom-up object: this is the data required by the frontend to render a checkout page
// for a service point
interface ServicePoint extends ServicePointRow {
  serviceLocation: ServiceLocationRow;
}

type PosParameters = PosParametersEmpty | PosParametersRoc | PosParametersVectron;

// https://en.wikipedia.org/wiki/ISO_4217
interface Currency {
  currencyId: string;
  name: string;
}

// https://en.wikipedia.org/wiki/ISO_3166-1
interface Country {
  countryId: string;
  name: string;
}
