import type { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from 'libs/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req;
  const { authorization: token } = headers;

  if (method === 'GET') {
    try {
      if (!token) {
        throw Error();
      }

      const { uid, email } = await firebaseAdmin.auth().verifyIdToken(token);
      return res.status(200).json({ email, uid });
    } catch (error) {
      return res.status(401).json({ error: 'unauthorized' });
    }
  }

  return res.status(405).json({ error: 'method not allowed' });
}
