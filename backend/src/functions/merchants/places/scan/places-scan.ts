import { response, ValidatedEventAPIGatewayProxyHandler } from '@libs/apiGateway';
import db from '@libs/database';
import { HttpException } from '@libs/http';
import { layerApiWithBody } from '@libs/lambda';
import { MiddyfiedHandler } from '@middy/core';

import schema from './schema';

const scanLimit = 100;

const handler: ValidatedEventAPIGatewayProxyHandler<typeof schema> = async (event) => {
  const placesBody: ApiPostPlacesScan = event.body;
  const { filters, lastKey } = placesBody;
  const expressionAttributeNames: AWS.DynamoDB.DocumentClient.ExpressionAttributeNameMap = {
    '#name': 'name',
  };
  const expressionAttributeValues: AWS.DynamoDB.DocumentClient.ExpressionAttributeValueMap = {};
  const filterExpression: string[] = [];

  const filterSingleExp = (field: string, value?: string | number) => {
    if (!value) return;
    const fieldName = filterExpression.length.toString();
    filterExpression.push(`contains(#n${fieldName}, :v${fieldName})`);
    expressionAttributeNames['#n' + fieldName] = field;
    expressionAttributeValues[':v' + fieldName] = value;
  };

  filterSingleExp('name', filters.name);
  filterSingleExp('vicinity', filters.vicinity);

  const outgoingScanObj: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'Places',
    ProjectionExpression:
      '#name,vicinity,place_id,geometry,rating,types,price_level,detailsFetchTs,icon',
    ExpressionAttributeNames: expressionAttributeNames,
    Limit: scanLimit,
  };

  if (filterExpression.length) {
    outgoingScanObj.FilterExpression = filterExpression.join(' OR ');
    outgoingScanObj.ExpressionAttributeValues = expressionAttributeValues;
  }

  const placesRows: Place[] = [];
  let lastScanKey: AWS.DynamoDB.DocumentClient.Key | undefined = lastKey;
  do {
    outgoingScanObj.ExclusiveStartKey = lastScanKey;
    const rs = await db.scan<Place>(outgoingScanObj);
    if ('error' in rs) throw new HttpException(rs.error.message);
    placesRows.push(...rs.data.Items);
    lastScanKey = rs.data.LastEvaluatedKey;
  } while (lastScanKey && placesRows.length < scanLimit);

  const data: ApiPostPlacesScanResponse = {
    message: 'ok',
    placesRows,
    lastKey: lastScanKey,
  };
  return response(data);
};

export const main: MiddyfiedHandler = layerApiWithBody(handler, schema);
