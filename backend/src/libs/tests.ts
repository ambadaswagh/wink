import type {
  APIGatewayProxyEvent,
  APIGatewayProxyEventMultiValueHeaders,
  APIGatewayProxyEventPathParameters,
  Context,
} from 'aws-lambda';

/* istanbul ignore file */

const headersTemplate = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36',
  Accept: 'application/json, */*',
  'Accept-Language': 'en-US;q=0.9',
  Host: 'test.winkapp.me',
};

export const createLambdaApiRequest = (params: MockLambdaConfig): MockLambdaApiParams => {
  const {
    data,
    method: httpMethod = 'GET',
    path = '/',
    isBase64Encoded = false,
    pathParameters = null,
  } = params;

  const now = Math.floor(Date.now() / 1000);
  const headers = Object.assign({}, headersTemplate, params.headers || {});
  const body = !data ? '' : typeof data === 'string' ? data : JSON.stringify(data);
  if (!headers['Content-Type']) {
    headers['Content-Type'] =
      data && typeof data === 'object' ? 'application/json' : 'application/x-www-form-urlencoded';
  }

  return [
    {
      body,
      headers,
      httpMethod,
      path,
      multiValueHeaders: toMultiValue(headers),
      isBase64Encoded,
      pathParameters,
      queryStringParameters: {},
      multiValueQueryStringParameters: {},
      stageVariables: null,
      requestContext: {
        accountId: '123456789012',
        apiId: '1234567890',
        domainName: 'test.winkapp.me',
        httpMethod,
        authorizer: null,
        identity: {
          accessKey: null,
          accountId: null,
          apiKey: null,
          apiKeyId: null,
          caller: null,
          clientCert: null,
          cognitoAuthenticationProvider: null,
          cognitoAuthenticationType: null,
          cognitoIdentityId: null,
          cognitoIdentityPoolId: null,
          principalOrgId: null,
          sourceIp: '127.0.0.1',
          user: null,
          userAgent: headers['User-Agent'],
          userArn: null,
        },
        path,
        protocol: 'https',
        requestId: '12345678-4f98-4e9c-8d60-767d6de9014c',
        requestTime: '',
        requestTimeEpoch: now,
        resourceId: '123456',
        resourcePath: path,
        stage: 'Test',
      },
      resource: '',
    },
    createLambdaContext(),
  ];
};

export const createLambdaInvokeRequest = <T>(event: T): MockLambdaInvokeParams<T> => [
  event,
  createLambdaContext(),
];

const createLambdaContext = (): Context => ({
  callbackWaitsForEmptyEventLoop: true,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '128',
  awsRequestId: '1234',
  logGroupName: '',
  logStreamName: '',
  identity: undefined,
  clientContext: undefined,
  getRemainingTimeInMillis: () => 30 * 1000,
  done: (error?: Error, result?: unknown) => [error, result],
  fail: (error: Error | string) => [error],
  succeed: (messageOrObject: unknown) => [messageOrObject],
});

const toMultiValue = (headers: Record<string, string>): APIGatewayProxyEventMultiValueHeaders => {
  return Object.entries(headers).reduce((multi, [key, value]) => {
    const existing = multi[key];
    /* istanbul ignore if */
    if (existing) {
      multi[key] = existing.concat(value);
    } else {
      multi[key] = [value];
    }
    return multi;
  }, {} as APIGatewayProxyEventMultiValueHeaders);
};

interface MockLambdaConfig {
  data?: unknown;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS';
  path?: string;
  headers?: Record<string, string>;
  isBase64Encoded?: boolean;
  pathParameters?: APIGatewayProxyEventPathParameters;
  isAdmin?: boolean;
}

type MockLambdaApiParams = [APIGatewayProxyEvent, Context];

type MockLambdaInvokeParams<T> = [T, Context];
