import { apiRoute } from '@/controllers/Api';

export async function PostRequest<PostResponse>(
  route: string,
  body: object,
  headers?: Record<string, string>,
): Promise<PostResponse> {
  const request = await fetch(apiRoute + route, {
    method: 'POST',
    body: JSON.stringify(body),
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
