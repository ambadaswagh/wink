import React from 'react';

import { api, apiUri } from '../api';
import { getApiConfig, LOCALSTORAGE_SELECTEDMERCHANT } from '../auth';

let setUserContext: SetUserContext;

export const UserContext = React.createContext<User | undefined>(undefined);

export const registerSetUserContext = (setUser: SetUserContext) => {
  // Dashboard.tsx will provide the function to this module, and provide context for
  // all components inside the dashboard
  setUserContext = setUser;
};

export const fetchDashboardData = async () => {
  const response = await api.get<ApiGetMerchantDashboard>(
    apiUri('merchants/dashboard'),
    getApiConfig()
  );
  if (response.data.message !== 'OK') {
    // TODO: error handling
    throw Error(response.data.message || response.data.toString());
  }
  if (!response.data.merchants.length) {
    // This user is not associated with any merchant
    // They have to either sign up as a restaurant, or ask to enter someone else's account
    // Setting the context to anything not undefined will start the flow
    setUserContext({ availableMerchantAccounts: [] });
    return;
  }
  const { merchantUser, merchants } = response.data;
  const selectedMerchantId = localStorage.getItem(LOCALSTORAGE_SELECTEDMERCHANT);
  const merchant =
    merchants.length === 1
      ? merchants[0]
      : selectedMerchantId
      ? merchants.find((m) => m.merchantId === selectedMerchantId)
      : undefined;
  setUserContext({
    merchantUser,
    availableMerchantAccounts: merchants,
    merchant,
  });
};

export const selectMerchant = (merchantId: string) => {
  localStorage.setItem(LOCALSTORAGE_SELECTEDMERCHANT, merchantId);
  setUserContext(
    (user) =>
      user && {
        ...user,
        merchant: user.availableMerchantAccounts.find((m) => m.merchantId === merchantId),
      }
  );
};

export interface User {
  merchantUser?: MerchantUser;
  availableMerchantAccounts: Merchant[];
  merchant?: Merchant; // selected merchant
}

type SetUserContext = React.Dispatch<React.SetStateAction<User | undefined>>;
