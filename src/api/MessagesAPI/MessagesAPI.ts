import BaseAPI from '../BaseAPI';
import { MessageModel } from '../../database/models/message';

class MessagesAPI extends BaseAPI {
  constructor() {
    super('/messages', '/api');
  }

  public createMessage(data: MessageModel): Promise<void> {
    return this.http.post('/', { data });
  }

  public readMessages(topicId: number): Promise<MessageModel[]> {
    return this.http.get<MessageModel[]>(`/${topicId}`);
  }

  public updateMessage(data: MessageModel): Promise<void> {
    return this.http.put('/', { data });
  }

  public deleteMessage(data: MessageModel): Promise<void> {
    return this.http.delete('/', { data });
  }
}

export const messagesAPI = new MessagesAPI();
