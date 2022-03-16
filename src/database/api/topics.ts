import { QueryTypes } from 'sequelize';

import { sequelize, Topic } from '../init';
import { TopicModel } from '../models';

export async function readTopics(userId: string) {
  const query = `
    SELECT t1.*, us.nick, t2.new_count, t3.last_time_update FROM (
        SELECT tp.*, COUNT(ms.id) mes_count
        FROM "Topics" tp
        LEFT JOIN "Messages" ms ON ms.topic_id=tp.id
        GROUP BY tp.id) t1
    LEFT JOIN (
        SELECT tp.id as topic_id, COUNT(ms.id) as new_count
        FROM "Topics" tp
        LEFT JOIN "Messages" ms ON ms.topic_id=tp.id
        LEFT JOIN (SELECT * FROM "Mlus" WHERE user_id=${userId}) ml ON ml.mess_id=ms.id
        WHERE ml.user_id=${userId}
        GROUP BY tp.id) t2 ON t1.id=t2.topic_id
    LEFT JOIN (
        SELECT ms.topic_id, Max(ms."createdAt") as last_time_update
        FROM "Messages" ms
        GROUP BY ms.topic_id) t3 ON t1.id=t3.topic_id
    LEFT JOIN "Users" us ON t1.user_id=us.id
    ORDER BY "last_time_update" DESC
    `;
  return await sequelize.query(query, { type: QueryTypes.SELECT, mapToModel: true });
}

export async function readTopicTitle(topicId: string) {
  const res: TopicModel[] = await Topic.findAll({
    where: {
      id: topicId
    },
    raw: true
  });
  return res[0].content.replace(/<\/?[^>]+>/gi, '');
}

export async function createTopic(data: TopicModel) {
  await Topic.create({
    user_id: data.user_id,
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
