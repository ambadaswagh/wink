import { AwsLambdaEnvironment, AwsLambdaVpcConfig, AwsResourceTags } from '@serverless/typescript';

export interface ServerlessFunction {
  name?: string;
  events?: ServerlessEvent[];
  awsKmsKeyArn?: AwsKmsArn;
  condition?: AwsResourceCondition;
  dependsOn?: AwsResourceDependsOn;
  description?: string;
  destinations?: {
    onSuccess?: string;
    onFailure?: string;
  };
  disableLogs?: boolean;
  environment?: AwsLambdaEnvironment;
  fileSystemConfig?: {
    arn: string | AwsCfGetAtt | AwsCfJoin | AwsCfImport;
    localMountPath: string;
  };
  handler?: string;
  image?:
    | EcrImageUri
    | {
        name?: string;
        uri?: EcrImageUri;
        workingDirectory?: string;
        command?: string[];
        entryPoint?: string[];
      };
  kmsKeyArn?: AwsKmsArn;
  layers?: AwsLambdaLayers;
  maximumEventAge?: number;
  maximumRetryAttempts?: number;
  memorySize?: AwsLambdaMemorySize;
  onError?: string | AwsCfFunction;
  package?: {
    artifact?: string;
    exclude?: string[];
    include?: string[];
    individually?: boolean;
    patterns?: string[];
  };
  provisionedConcurrency?: number;
  reservedConcurrency?: number;
  role?: AwsLambdaRole;
  runtime?: AwsLambdaRuntime;
  tags?: AwsResourceTags;
  timeout?: AwsLambdaTimeout;
  tracing?: AwsLambdaTracing;
  versionFunction?: AwsLambdaVersioning;
  vpc?: AwsLambdaVpcConfig;
  httpApi?: {
    payload?: AwsHttpApiPayload;
  };
}

type ServerlessEvent =
  | { __schemaWorkaround__: Record<string, unknown> }
  | { schedule: string | ServerlessEventSchedule }
  | { s3: string | ServerlessEventS3 }
  | { http: string | ServerlessEventHttp }
  | { websocket: string | ServerlessEventWebsocket }
  | { sns: string | AwsArnString | Record<string, unknown> }
  | { stream: AwsArnString | ServerlessEventStream }
  | { kafka: ServerlessEventKafka }
  | {
      msk: {
        arn: AwsArnString | AwsCfImport | AwsCfRef;
        batchSize?: number;
        enabled?: boolean;
        startingPosition?: 'LATEST' | 'TRIM_HORIZON';
        topic: string;
      };
    }
  | {
      alb: {
        authorizer?: string[];
        conditions: {
          header?: {
            name: string;
            values: string[];
          };
          host?: string[];
          ip?: string[];
          method?: string[];
          path?: string[];
          query?: Record<string, string>;
        };
        healthCheck?:
          | boolean
          | {
              healthyThresholdCount?: number;
              intervalSeconds?: number;
              matcher?: {
                httpCode?: string;
              };
              path?: string;
              timeoutSeconds?: number;
              unhealthyThresholdCount?: number;
            };
        listenerArn: AwsAlbListenerArn | AwsCfRef;
        multiValueHeaders?: boolean;
        priority: number;
        targetGroupName?: string;
      };
    }
  | {
      alexaSkill:
        | AwsAlexaEventToken
        | {
            appId: AwsAlexaEventToken;
            enabled?: boolean;
          };
    }
  | {
      alexaSmartHome:
        | AwsAlexaEventToken
        | {
            appId: AwsAlexaEventToken;
            enabled?: boolean;
          };
    }
  | {
      iot: {
        sql: string;
        sqlVersion?: '2015-10-08' | '2016-03-23' | 'beta';
        name?: string;
        enabled?: boolean;
        description?: string;
      };
    }
  | {
      iotFleetProvisioning: {
        enabled?: boolean;
        provisioningRoleArn: AwsArn;
        templateBody: Record<string, unknown>;
        templateName?: string;
      };
    }
  | {
      cloudwatchEvent: {
        event?: Record<string, unknown>;
        input?: string | Record<string, unknown>;
        inputPath?: string;
        inputTransformer?: {
          inputPathsMap?: Record<string, string>;
          inputTemplate: string;
        };
        description?: string;
        name?: string;
        enabled?: boolean;
      };
    }
  | {
      cloudwatchLog:
        | AwsLogGroupName
        | {
            logGroup: AwsLogGroupName;
            filter?: string;
          };
    }
  | {
      cognitoUserPool: {
        pool: string;
        trigger:
          | 'PreSignUp'
          | 'PostConfirmation'
          | 'PreAuthentication'
          | 'PostAuthentication'
          | 'PreTokenGeneration'
          | 'CustomMessage'
          | 'DefineAuthChallenge'
          | 'CreateAuthChallenge'
          | 'VerifyAuthChallengeResponse'
          | 'UserMigration';
        existing?: boolean;
      };
    }
  | { eventBridge: Record<string, unknown> }
  | {
      sqs:
        | AwsArn
        | {
            arn: AwsArn;
            batchSize?: number;
            enabled?: boolean;
            maximumBatchingWindow?: number;
          };
    }
  | {
      cloudFront: {
        behavior?: {
          AllowedMethods?: ('GET' | 'HEAD' | 'OPTIONS' | 'PUT' | 'PATCH' | 'POST' | 'DELETE')[];
          CachedMethods?: ('GET' | 'HEAD' | 'OPTIONS')[];
          ForwardedValues?: {
            Cookies?:
              | {
                  Forward: 'all' | 'none';
                }
              | {
                  Forward: 'whitelist';
                  WhitelistedNames: string[];
                };
            Headers?: string[];
            QueryString: boolean;
            QueryStringCacheKeys?: string[];
          };
          CachePolicyId?: string;
          Compress?: boolean;
          FieldLevelEncryptionId?: string;
          OriginRequestPolicyId?: string;
          SmoothStreaming?: boolean;
          TrustedSigners?: string[];
          ViewerProtocolPolicy?: 'allow-all' | 'redirect-to-https' | 'https-only';
        };
        cachePolicy?: Record<string, unknown>;
        eventType?: 'viewer-request' | 'origin-request' | 'origin-response' | 'viewer-response';
        isDefaultOrigin?: boolean;
        includeBody?: boolean;
        origin?: string | Record<string, unknown>;
        pathPattern?: string;
      };
    }
  | {
      httpApi:
        | string
        | {
            authorizer?: string | Record<string, unknown>;
            method?: string;
            path: string;
          };
    };

interface ServerlessEventSchedule {
  rate: string;
  enabled?: boolean;
  name?: string;
  description?: string;
  input?: string | { body: string } | Record<string, unknown>;
  inputPath?: string;
  inputTransformer?: {
    inputTemplate: string;
    inputPathsMap?: Record<string, unknown>;
  };
}

interface ServerlessEventS3 {
  bucket: string | AwsCfFunction;
  event?: string;
  existing?: boolean;
  rules?: {
    prefix?: string;
    suffix?: string;
  }[];
}

interface ServerlessEventHttp {
  async?: boolean;
  authorizer?: string | ServerlessEventHttpAuthorizer;
  connectionId?: string;
  connectionType?: string;
  cors?: boolean | Record<string, unknown>;
  integration?: string;
  method: string;
  operationId?: string;
  path: string;
  private?: boolean;
  request?: {
    contentHandling?: 'CONVERT_TO_BINARY' | 'CONVERT_TO_TEXT';
    method?: string;
    parameters?: {
      querystrings?: ServerlessHttpRequestParameterMap;
      headers?: ServerlessHttpRequestParameterMap;
      paths?: ServerlessHttpRequestParameterMap;
    };
    passThrough?: 'NEVER' | 'WHEN_NO_MATCH' | 'WHEN_NO_TEMPLATES';
    schema?: {
      [k: string]: Record<string, unknown> | string;
    };
    schemas?: {
      [k: string]: Record<string, unknown> | string;
    };
    template?: Record<string, string>;
    uri?: string;
  };
  response?: {
    contentHandling?: 'CONVERT_TO_BINARY' | 'CONVERT_TO_TEXT';
    headers?: Record<string, string>;
    template?: string;
    statusCodes?: Record<string, ServerlessResponseStatusCode>;
  };
}

interface ServerlessEventWebsocket {
  route: string;
  routeResponseSelectionExpression?: '$default';
  authorizer?: AwsArnString | FunctionName | Record<string, unknown>;
}

type ServerlessEventStream =
  | {
      arn: AwsCfFunction;
      [k: string]: unknown;
    }
  | {
      arn: AwsArnString;
      [k: string]: unknown;
    };

interface ServerlessEventKafka {
  accessConfigurations: {
    vpcSubnet?: string[];
    vpcSecurityGroup?: string[];
    saslScram256Auth?: string[];
    saslScram512Auth?: string[];
  };
  batchSize?: number;
  enabled?: boolean;
  bootstrapServers: string[];
  startingPosition?: 'LATEST' | 'TRIM_HORIZON';
  topic: string;
}

interface ServerlessHttpRequestParameter {
  required?: boolean;
  mappedValue?: string;
}

type ServerlessHttpRequestParameterMap = Record<string, boolean | ServerlessHttpRequestParameter>;

interface ServerlessResponseStatusCode {
  headers?: Record<string, string>;
  pattern?: string;
  template?: string | Record<string, string>;
}

export interface ServerlessEventHttpAuthorizer {
  arn?: AwsArn;
  authorizerId?: AwsCfInstruction;
  claims?: string[];
  identitySource?: string;
  identityValidationExpression?: string;
  managedExternally?: boolean;
  name?: string;
  resultTtlInSeconds?: number;
  scopes?: string[];
  type?: string;
}

type AwsArnString = string;
type AwsCfFunction = AwsCfImport | AwsCfJoin | AwsCfGetAtt | AwsCfRef | AwsCfSub;
type AwsArn = AwsArnString | AwsCfFunction;
type AwsCfInstruction = string | AwsCfFunction;
type FunctionName = string;
type AwsAlbListenerArn = string;
type AwsAlexaEventToken = string;
type AwsLogGroupName = string;
type AwsKmsArn = Record<string, unknown> | string;
type AwsResourceCondition = string;
type AwsResourceDependsOn = string[];
type EcrImageUri = string;
type AwsLambdaLayers = AwsArn[];
type AwsLambdaMemorySize = number;
type AwsLambdaRole = string | AwsCfSub | AwsCfImport | AwsCfGetAtt;
type AwsLambdaRuntime =
  | 'dotnetcore2.1'
  | 'dotnetcore3.1'
  | 'go1.x'
  | 'java11'
  | 'java8'
  | 'java8.al2'
  | 'nodejs10.x'
  | 'nodejs12.x'
  | 'nodejs14.x'
  | 'provided'
  | 'provided.al2'
  | 'python2.7'
  | 'python3.6'
  | 'python3.7'
  | 'python3.8'
  | 'ruby2.5'
  | 'ruby2.7';
type AwsLambdaTimeout = number;
type AwsLambdaTracing = ('Active' | 'PassThrough') | boolean;
type AwsLambdaVersioning = boolean;
type AwsHttpApiPayload = '1.0' | '2.0';

interface AwsCfImport {
  'Fn::ImportValue': unknown;
}
interface AwsCfJoin {
  'Fn::Join': [string, unknown[]];
}
interface AwsCfGetAtt {
  'Fn::GetAtt': string[];
}
interface AwsCfRef {
  Ref: string;
}
interface AwsCfSub {
  'Fn::Sub': unknown;
}
