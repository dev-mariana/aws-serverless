import { env } from '@/env';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

// const client = new DynamoDBClient({ region: 'us-east-1' });
// const documentClient = DynamoDBDocumentClient.from(client);

export const config: DynamoDBClientConfig = {
  region: env.AWS_DEFAULT_REGION,
  endpoint: env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
};
