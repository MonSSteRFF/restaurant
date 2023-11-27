import { apiRoute } from '@/controllers/Api';

export async function GetRequest<GetResponse>(
  route: string,
  headers?: Record<string, string>,
): Promise<GetResponse> {
  const request = await fetch(apiRoute + route, {
    method: 'GET',
    headers,
  });
  const requestText = await request.text();

  return new Promise((resolve, reject) => {
    if (request.status !== 200) {
      reject(requestText);
    }

    try {
      resolve(JSON.parse(requestText));
    } catch (e) {
      reject(e);
    }
  });
}
