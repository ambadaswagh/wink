import db from '@libs/database';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

const apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
let key: string;

const maxResults = 5000;
const start = {
  lat: 52.495,
  lng: 13.415,
};
const startIteration = 465;

const boxSizeDegrees = {
  lat: 0.002,
  lng: 0.004,
}; // by how much we can move around

const largestSizeDegrees = Math.max(boxSizeDegrees.lat, boxSizeDegrees.lng);
const radiusDegrees = Math.sqrt(2 * (largestSizeDegrees / 2) ** 2);

const boxSizeMeters = {
  lat: measure(start.lat, start.lng, start.lat + boxSizeDegrees.lat, start.lng),
  lng: measure(start.lat, start.lng, start.lat, start.lng + boxSizeDegrees.lng),
};
const largestSizeMeters = Math.max(boxSizeMeters.lat, boxSizeMeters.lng);
const radiusMeters = Math.ceil(Math.sqrt(2 * (largestSizeMeters / 2) ** 2)); // 240m
const radiusMetersStr = radiusMeters.toString();

console.info(`Using configuration:
start: ${start.lat},${start.lng}
box size: ${boxSizeDegrees.lat},${boxSizeDegrees.lng} (${boxSizeMeters.lat}m,${boxSizeMeters.lng}m)
radius: ${radiusDegrees} (${radiusMeters}m)
`);

let apiCalls = 0;
const receivedIds: Record<string, true> = {};

const handler: AWSLambda.ScheduledHandler = async () => {
  key = process.env.GOOGLE_PLACES_APIKEY || '';
  if (!key) throw Error('Missing Google Places Api Key (GOOGLE_PLACES_APIKEY)');

  let x = 0;
  let y = 0;
  let d = 1;
  let m = 1;
  let moveOrientation = 'x';

  let total = 0;
  let iteration = 0;
  while (total < maxResults) {
    if (iteration >= startIteration) {
      console.info(`Starting iteration ${iteration}, square (${x},${y}), total so far: ${total}`);
      const count = await searchBox(
        start.lat + x * boxSizeDegrees.lat,
        start.lng + y * boxSizeDegrees.lng
      );
      total += count;
      await recordPass(
        start.lat + x * boxSizeDegrees.lat - radiusDegrees,
        start.lng + y * boxSizeDegrees.lng - radiusDegrees,
        start.lat + x * boxSizeDegrees.lat + radiusDegrees,
        start.lng + y * boxSizeDegrees.lng + radiusDegrees,
        iteration,
        count
      );
      console.info('Number of API calls:', apiCalls);
    }
    iteration++;

    if (moveOrientation === 'x') {
      x += d;
      if (2 * x * d >= m) moveOrientation = 'y';
    } else {
      y += d;
      if (2 * y * d >= m) {
        moveOrientation = 'x';
        d = -d;
        m++;
      }
    }
  }
};

const searchBox = async (lat: number, lng: number): Promise<number> => {
  let total = 0;
  let nextPageToken: string | null = null;
  let page = 0;
  do {
    const params: NodeJS.Dict<string | ReadonlyArray<string>> = nextPageToken
      ? {
          key,
          pagetoken: nextPageToken,
        }
      : {
          key,
          type: 'restaurant',
          location: [lat, lng].join(','),
          radius: radiusMetersStr,
        };

    const resp: PlacesNearbySearchReply = await fetch(
      apiUrl + '?' + new URLSearchParams(params).toString()
    ).then((resp) => resp.json());
    apiCalls++;

    const items = resp.results;
    total += items.length;

    if (items.length > 25) {
      throw Error('Received more than 25 places; batchWrite cannot handle that much');
    }

    if (!items.length) {
      console.error('No items returned:', resp.status);
      if (resp.status === 'INVALID_REQUEST') throw Error('Bad Places API response');
      break;
    }

    await db
      .batchWrite({
        RequestItems: {
          Places: items.map((p) => ({
            PutRequest: { Item: p },
          })),
        },
      })
      .then((ok) => {
        if ('error' in ok) {
          console.error('DynamoDB error:', ok.error.message);
          process.exit(1);
        }
      });

    const repeated = items.reduce((sum, i) => sum + (receivedIds[i.place_id] ? 1 : 0), 0);
    items.forEach((i) => (receivedIds[i.place_id] = true));
    console.debug(
      `Page ${page}: Received ${total} places, ${repeated} (${Math.round(
        (repeated / items.length) * 100
      )}%) repeats`
    );

    nextPageToken = resp.next_page_token;
    if (total >= 60) {
      console.error(`ATTENTION: Number of results was the max at (${lat},${lng})`);
      //throw Error(`Too many results at (${lat},${lng})`);
    }

    if (nextPageToken) {
      await new Promise((resolve) => setTimeout(resolve, 5000, 0));
    }
    page++;
  } while (nextPageToken);

  console.info(`Places received for this square: ${total}`);
  return total;
};

const recordPass = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  iteration: number,
  count: number
) => {
  const passTs = Date.now() / 1000;
  const ok = await db.put({
    TableName: 'PlacesScan',
    Item: {
      version: 1,
      passTs,
      lat1,
      lng1,
      lat2,
      lng2,
      iteration,
      count,
    },
  });
  if ('error' in ok) throw Error(ok.error.message);
};

// generally used geo measurement function
function measure(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lng2 * Math.PI) / 180 - (lng1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
}

export const main = handler;

interface PlacesNearbySearchReply {
  html_attributions: unknown[];
  next_page_token: string | null;
  results: Place[];
  status: string;
}
