import { Message } from '../init';
import { MessageModel } from '../models/message';

export async function readMessages(topic_id: string) {
  return await Message.findAll({
    where: {
      topic_id
    },
    order: ['createdAt']
  });
}

export async function createMessage(data: MessageModel) {
  await Message.create({
    topic_id: data.topic_id,
    author: data.author,
    content: data.content
  });
}

export async function updateMessage(data: MessageModel) {
  await Message.update(
    {
      content: data.content
    },
    {
      where: { id: data.id }
    }
  );
}

export async function deleteMessage(data: MessageModel) {
  await Message.destroy({
    where: { id: data.id }
  });
}
