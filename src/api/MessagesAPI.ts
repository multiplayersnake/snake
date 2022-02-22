import BaseAPI from './BaseAPI';

export type GetMessages = {
  topic_id: number;
};

export interface IMessage {
  id: number;
  topic_id: number;
  author: string;
  content: string;
}

class MessagesAPI extends BaseAPI {
  constructor() {
    super('/messages', 'http://localhost:3000/api');
  }

  public GetMessages(topic_id: number): Promise<IMessage[]> {
    return this.http.get<IMessage[]>(`/get/${topic_id}`);
  }
}

export default new MessagesAPI();
