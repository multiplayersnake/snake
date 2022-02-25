import { Message } from '../init';
import { MessageType } from '../models/message';

// CRUD модель для Message

export async function readMessage(topic_id: string) {
  return await Message.findAll({
    where: {
      topic_id
    },
    order: ['createdAt']
  });
}

export async function createMessage(data: MessageType) {
  await Message.create({
    topic_id: data.topic_id,
    author: data.author,
    content: data.content
  });
}

export async function updateMessage(data: MessageType) {
  await Message.update(
    {
      content: data.content
    },
    {
      where: { id: data.id }
    }
  );
}

export async function deleteMessage(data: MessageType) {
  await Message.destroy({
    where: { id: data.id }
  });
}
