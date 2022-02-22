import { Message } from './init';
import { IMessage } from './models/message';

export async function getMessages(topic_id: string) {
  return await Message.findAll({
    where: {
      topic_id: topic_id
    }
  });
}

export async function newMessage(data: IMessage) {
  await Message.create({
    topic_id: data.topic_id,
    author: data.author,
    content: data.content
  });
}
