import { User } from '../init';
import { UserModel } from '../models';

export async function createUser(data: UserModel) {
  const res = await User.findAll({
    where: { id: data.id }
  });

  if (res.length === 0) {
    await User.create({
      id: data.id,
      nick: data.nick
    });
  }
}
