import { Message } from './init';
import { IMessage } from './models/message';

// CRUD модель для Message

export async function readMessage(topic_id: string) {
  return await Message.findAll({
    where: {
      topic_id: topic_id
    }
  });
}

export async function createMessage(data: IMessage) {
  await Message.create({
    topic_id: data.topic_id,
    author: data.author,
    content: data.content
  });
}
