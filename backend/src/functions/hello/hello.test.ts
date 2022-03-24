import { createLambdaApiRequest } from '@libs/tests';

import { main } from './hello';

it('greets the user', async () => {
  const name = 'test123';
  const response = await main(...createLambdaApiRequest({ data: { name } }));

  const body = JSON.parse(response.body);
  expect(body.message).toBeDefined();
  expect(body.message).toContain(name);
});
