import { response } from '@libs/apiGateway';
import db from '@libs/database';
import { HttpException, HttpStatusCode } from '@libs/http';
import { layerApi } from '@libs/lambda';
import { MiddyfiedHandler } from '@middy/core';
import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

const apiUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
const key = process.env.GOOGLE_PLACES_APIKEY;

const handler: APIGatewayProxyHandler = async (event) => {
  if (!key) throw Error('Missing Google Places Api Key (GOOGLE_PLACES_APIKEY)');
  const placeId = event.pathParameters?.id;

  const rs = await db.get<Place | PlaceDetailed>({
    TableName: 'Places',
    Key: { place_id: placeId },
  });
  // istanbul ignore next
  if ('error' in rs) {
    return response({ message: rs.error.message }, 500);
  }

  const place = rs.data.Item;
  // istanbul ignore next
  if (!place) throw new HttpException(`Place ${placeId} not found`, HttpStatusCode.NOT_FOUND);

  if (!('detailsFetchTs' in place)) {
    const data: PlacesDetailedResponse = await fetch(
      apiUrl + '?' + new URLSearchParams({ key, place_id: placeId }).toString()
    ).then((resp) => resp.json());

    if (data.status !== 'OK') throw new HttpException(data.status);

    const placeDetailed: PlaceDetailed = Object.assign(place, data.result, {
      detailsFetchTs: Date.now() / 1000,
    });

    const ok = await db.put({
      TableName: 'Places',
      Item: placeDetailed,
    });
    if ('error' in ok) throw new HttpException(ok.error.message);
  }

  return response({
    message: 'OK',
    place,
    event,
  });
};

export const main: MiddyfiedHandler = layerApi(handler);

interface PlacesDetailedResponse {
  status: string;
  info_messages?: string[];
  html_attributions: unknown[];
  result: PlaceDetailed;
}
