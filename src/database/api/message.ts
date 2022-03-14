import { Message, User, Mlu, sequelize } from '../init';
import { MessageModel, MluModel, UserModel } from '../models';
import { Op, QueryTypes } from 'sequelize';

export async function readMessages(topic_id: string, user_id: string) {
  const query = `
    SELECT ms.*, us.nick
    FROM "Messages" ms
    LEFT JOIN "Users" us ON ms.user_id=us.id
    WHERE ms.topic_id=${topic_id}
    ORDER BY ms."createdAt" DESC
    `;
  const messagesList: MessageModel[] = await sequelize.query(query, { type: QueryTypes.SELECT, mapToModel: true });

  //Стирание указаний для данного пользователя о непрочитанных сообщениях этой темы
  const mluList: number[] = [];
  for (let i = 0; i < messagesList.length; i++) {
    mluList.push(messagesList[i].id);
  }
  await Mlu.destroy({
    where: {
      user_id: user_id,
      mess_id: {
        [Op.in]: mluList
      }
    }
  });
  return messagesList;
}

export async function createMessage(data: MessageModel) {
  const res = await Message.create({
    topic_id: data.topic_id,
    user_id: data.user_id,
    content: data.content
  });

  //Вставка указания для всех пользователей, кроме создателя, что данное сообщение не прочитано
  const userList: UserModel[] = await User.findAll({
    attributes: [`id`],
    raw: true
  });
  const mluList: MluModel[] = [];
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id !== data.user_id) {
      mluList.push({ user_id: userList[i].id, mess_id: res.id });
    }
  }
  await Mlu.bulkCreate(mluList);
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
