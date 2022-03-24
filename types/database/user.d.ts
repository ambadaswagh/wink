interface MerchantUserRow {
  name: string;
  email: string;
  userId: string; // cognito's `sub`
  merchants: MerchantAccess[];
  roles: MerchantUserRole[];
}

interface MerchantAccess {
  merchantId: string;
  serviceLocations: ServiceLocationAccess[] | null;
  roles: MerchantUserRole[];
}

interface ServiceLocationAccess {
  serviceLocationId: string;
  roles: MerchantUserRole[];
}

type MerchantUserRole = 'ADMIN' | 'FINANCIAL' | 'OPERATIONS' | 'REPORTS';
