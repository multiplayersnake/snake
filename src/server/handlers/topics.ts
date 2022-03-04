import { Request, Response } from 'express';

import { readTopics, createTopic, updateTopic, deleteTopic } from '../../database';

export async function createTopicHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await createTopic(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}

export async function readTopicsHandler(req: Request, res: Response) {
  const topics = await readTopics();
  res.status(200).send(topics);
}

export async function updateTopicHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await updateTopic(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}

export async function deleteTopicHandler(req: Request, res: Response) {
  req.on('data', async (chunk) => {
    await deleteTopic(JSON.parse(chunk.toString()));
    res.status(200).send('OK');
  });
}
