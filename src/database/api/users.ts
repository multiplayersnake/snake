import { User } from '../init';
import { UserModel } from '../models';

export async function syncUser(data: UserModel) {
  const res = await User.findOne({
    where: { id: data.id }
  });

  if (res) return;

  await User.create({
    id: data.id,
    nick: data.nick
  });
}
