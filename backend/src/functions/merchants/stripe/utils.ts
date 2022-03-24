import { authorizeUser } from '@libs/auth';
import { HttpException, HttpStatusCode } from '@libs/http';
import merchantRepo from '@libs/repositories/merchant';
import { APIGatewayProxyCognitoAuthorizer } from 'aws-lambda';

export const getMerchantForEvent = async (
  authorizer: APIGatewayProxyCognitoAuthorizer,
  merchantId?: string
): Promise<MerchantRow> => {
  if (!merchantId) {
    throw new HttpException(
      `Invalid merchant id '${merchantId || ''}'`,
      HttpStatusCode.BAD_REQUEST
    );
  }

  const user = await authorizeUser(authorizer);

  if (user.merchants.every((m) => m.merchantId !== merchantId)) {
    throw new HttpException(
      `You are not authorized to connect a Stripe account to the specified merchant '${merchantId}'`,
      HttpStatusCode.FORBIDDEN
    );
  }

  const merchant = await merchantRepo.getMerchant(merchantId);

  if (!merchant) {
    throw new HttpException(`Merchant '${merchantId}' not found!`, HttpStatusCode.NOT_FOUND);
  }

  return merchant;
};
