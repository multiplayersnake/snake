import BaseAPI from './BaseAPI';
import { MessageType } from '../database/models/message';

// CRUD для объекта Message

class MessagesAPI extends BaseAPI {
  constructor() {
    super('/messages', 'http://localhost:3000/api');
  }

  public createMessage(data: MessageType): Promise<void> {
    return this.http.post('/', {
      data
    });
  }

  public readMessage(topicId: number): Promise<MessageType[]> {
    return this.http.get<MessageType[]>(`/${topicId}`);
  }

  public updateMessage(data: MessageType): Promise<void> {
    return this.http.put('/', {
      data
    });
  }

  public deleteMessage(data: MessageType): Promise<void> {
    return this.http.delete('/', {
      data
    });
  }
}

export default new MessagesAPI();
