interface CognitoAuthResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
  created_at?: number; // added by us
}

interface LocalUser {
  userId: string;
  token: CognitoAuthResponse;
  profile: UserProfile;
}

interface AuthorizedUser {
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
  picture: string | undefined;
  social: string[];
  admin: boolean;
}

interface UserProfile {
  at_hash: string;
  aud: string;
  auth_time: number;
  'cognito:groups'?: string[];
  'cognito:username': string;
  'custom:postal_code'?: string;
  email: string;
  email_verified: false;
  event_id?: string;
  exp: number;
  family_name?: string;
  given_name?: string;
  iat: number;
  identities?: UserIdentity[];
  iss: string;
  name: string;
  nonce?: string;
  phone_number_verified?: boolean;
  picture?: string;
  sub: string;
  token_use: string;
}

interface UserIdentity {
  dateCreated: string;
  issuer: null;
  primary: 'true' | 'false';
  providerName: UserIdentityProvider;
  providerType: UserIdentityProvider;
  userId: string;
}

type UserIdentityProvider = 'LoginWithAmazon' | 'Google' | 'Facebook';
