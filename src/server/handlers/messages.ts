import { Request, Response } from 'express';

import { readMessage, createMessage, updateMessage, deleteMessage } from '../../database';

export async function createMessageHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await createMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}

export async function readMessageHandler(req: Request, res: Response) {
  const message = await readMessage(req.params.topic_id);
  res.status(200).send(message);
}

export async function updateMessageHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await updateMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}

export async function deleteMessageHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await deleteMessage(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}
