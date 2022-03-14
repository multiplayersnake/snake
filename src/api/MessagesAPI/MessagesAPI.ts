import BaseAPI from '../BaseAPI';
import { MessageModel, MessageWithTimeStamps } from '../../database/models';

class MessagesAPI extends BaseAPI {
  constructor() {
    super('/messages', '/api');
  }

  public createMessage(data: MessageModel): Promise<void> {
    return this.http.post('/', { data });
  }

  public readMessages(topicId: number, userId: number): Promise<MessageWithTimeStamps[]> {
    return this.http.get<MessageWithTimeStamps[]>(`/${topicId}/${userId}`);
  }

  public updateMessage(data: MessageModel): Promise<void> {
    return this.http.put('/', { data });
  }

  public deleteMessage(data: MessageModel): Promise<void> {
    return this.http.delete('/', { data });
  }
}

export const messagesAPI = new MessagesAPI();
