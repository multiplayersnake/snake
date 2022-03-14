import { Request, Response } from 'express';

import { createUser } from '../../database';

export async function createUserHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await createUser(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}
