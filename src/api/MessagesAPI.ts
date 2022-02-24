import BaseAPI from './BaseAPI';
import { IMessage } from '../database/models/message';

// CRUD для объекта Message

class MessagesAPI extends BaseAPI {
  constructor() {
    super('/messages', 'http://localhost:3000/api');
  }

  public createMessage(data: IMessage): Promise<void> {
    return this.http.post('/create', {
      data: data
    });
  }

  public readMessage(topic_id: number): Promise<IMessage[]> {
    return this.http.get<IMessage[]>(`/read/${topic_id}`);
  }

  public updateMessage(data: IMessage): Promise<void> {
    return this.http.post('/update', {
      data: data
    });
  }

  public deleteMessage(data: IMessage): Promise<void> {
    return this.http.post('/delete', {
      data: data
    });
  }
}

export default new MessagesAPI();
