import { Topic } from '../init';
import { TopicModel } from '../models';

export async function readTopics() {
  return await Topic.findAll({ order: ['createdAt'] });
}

export async function createTopic(data: TopicModel) {
  await Topic.create({
    author: data.author,
    content: data.content
  });
}

export async function updateTopic(data: TopicModel) {
  await Topic.update(
    {
      content: data.content
    },
    {
      where: { id: data.id }
    }
  );
}

export async function deleteTopic(data: TopicModel) {
  await Topic.destroy({
    where: { id: data.id }
  });
}
