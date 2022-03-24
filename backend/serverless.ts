import billCreate from '@functions/bill/create';
import billUpdate from '@functions/bill/update';
import contactInfoGetData from '@functions/contact/get-data';
import cronPlaces from '@functions/cron/places';
import merchantCreate from '@functions/merchants/create';
import merchantDashboard from '@functions/merchants/dashboard';
import placesGet from '@functions/merchants/places/get';
import placesScan from '@functions/merchants/places/scan';
import stripeAccountConnect from '@functions/merchants/stripe/account/connect';
import stripeAccountUpdateStatus from '@functions/merchants/stripe/account/update-status';
import ordersGet from '@functions/orders/get';
import servicePointsCreate from '@functions/servicePoints/create';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  org: 'winkapp',
  app: 'backend',
  service: 'backend',
  frameworkVersion: '2',
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-domain-manager',
    'serverless-stage-manager',
  ],
  useDotenv: true,
  configValidationMode: 'error',

  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    'serverless-offline': {
      httpPort: 3012,
      noPrependStageInUrl: true,
    },
    customDomain: {
      domainName: 'api.winkapp.me',
      stage: 'production',
      basePath: '',
      certificateName: 'winkapp.me',
      createRoute53Record: true,
      endpointType: 'regional',
      securityPolicy: 'tls_1_2',
      apiType: 'rest',
      autoDomain: false,
      enabled: true,
    },
    stages: ['production'],
    logRetentionInDays: 30,
  },

  provider: {
    name: 'aws',
    region: 'eu-central-1',
    stage: 'production',
    runtime: 'nodejs14.x',
    logRetentionInDays: 14,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      STRIPE_KEY: '${env:STRIPE_KEY}',
      TEAMS_CONTACT_WEBHOOK_KEY: '${env:TEAMS_CONTACT_WEBHOOK_KEY}',
      GOOGLE_PLACES_APIKEY: '${env:GOOGLE_PLACES_APIKEY}',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        name: 'serviceWideSharedRole',
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:BatchGetItem',
              'dynamodb:BatchWriteItem',
              'dynamodb:DeleteItem',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:UpdateItem',
            ],
            Resource: [
              'userTable',
              'merchantTable',
              'serviceLocationTable',
              'servicePointTable',
              'checkoutTransactionTable',
              'placesTable',
              'placesScanTable',
              'contactTable',
            ]
              .map((table) => [
                { 'Fn::Sub': '${' + table + '.Arn}' },
                { 'Fn::Sub': '${' + table + '.Arn}/index/*' },
              ])
              .flat(),
          },
        ],
      },
    },
  },

  resources: {
    Resources: {
      userTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'User',
          AttributeDefinitions: [
            {
              AttributeName: 'userId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'userId',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      merchantTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Merchant',
          AttributeDefinitions: [
            {
              AttributeName: 'merchantId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'merchantId',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      serviceLocationTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'ServiceLocation',
          AttributeDefinitions: [
            {
              AttributeName: 'serviceLocationId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'merchantId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'serviceLocationId',
              KeyType: 'HASH',
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: 'merchantIdIdx',
              KeySchema: [
                {
                  AttributeName: 'merchantId',
                  KeyType: 'HASH',
                },
              ],
              Projection: { ProjectionType: 'ALL' },
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      servicePointTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'ServicePoint',
          AttributeDefinitions: [
            {
              AttributeName: 'servicePointId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'serviceLocationId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'servicePointId',
              KeyType: 'HASH',
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: 'serviceLocationIdIdx',
              KeySchema: [
                {
                  AttributeName: 'serviceLocationId',
                  KeyType: 'HASH',
                },
              ],
              Projection: { ProjectionType: 'ALL' },
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      checkoutTransactionTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'CheckoutTransaction',
          AttributeDefinitions: [
            {
              AttributeName: 'checkoutTransactionId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'paymentTs',
              AttributeType: 'N',
            },
            {
              AttributeName: 'merchantId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'paymentProcessor',
              AttributeType: 'S',
            },
            {
              AttributeName: 'processorTransactionId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'checkoutTransactionId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'paymentTs',
              KeyType: 'RANGE',
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: 'merchantIdIdx',
              KeySchema: [
                {
                  AttributeName: 'merchantId',
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'paymentTs',
                  KeyType: 'RANGE',
                },
              ],
              Projection: { ProjectionType: 'ALL' },
            },
            {
              IndexName: 'processorTransactionIdIdx',
              KeySchema: [
                {
                  AttributeName: 'paymentProcessor',
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'processorTransactionId',
                  KeyType: 'RANGE',
                },
              ],
              Projection: { ProjectionType: 'ALL' },
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      placesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Places',
          AttributeDefinitions: [
            {
              AttributeName: 'place_id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'place_id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      placesScanTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'PlacesScan',
          AttributeDefinitions: [
            {
              AttributeName: 'version',
              AttributeType: 'N',
            },
            {
              AttributeName: 'passTs',
              AttributeType: 'N',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'version',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'passTs',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
      contactTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'ContactInfo',
          AttributeDefinitions: [
            {
              AttributeName: 'contactType',
              AttributeType: 'S',
            },
            {
              AttributeName: 'contactTs',
              AttributeType: 'N',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'contactType',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'contactTs',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          StreamSpecification: { StreamViewType: 'KEYS_ONLY' },
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
        },
      },
    },
  },

  // import the function via paths
  functions: {
    billCreate,
    billUpdate,
    cronPlaces,
    merchantCreate,
    merchantDashboard,
    ordersGet,
    servicePointsCreate,
    stripeAccountConnect,
    stripeAccountUpdateStatus,
    placesScan,
    placesGet,
    contactInfoGetData,
  },
};

module.exports = serverlessConfiguration;
