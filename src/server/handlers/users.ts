import { Request, Response } from 'express';

import { syncUser } from '../../database';

export async function syncUserHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await syncUser(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}
