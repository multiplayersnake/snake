import BaseAPI from '../BaseAPI';
import { TopicModel, TopicWithTimeStamps } from '../../database/models';

class TopicsAPI extends BaseAPI {
  constructor() {
    super('/topics', '/api');
  }

  public createTopic(data: TopicModel): Promise<void> {
    return this.http.post('/', { data });
  }

  public readTopics(): Promise<TopicWithTimeStamps[]> {
    return this.http.get<TopicWithTimeStamps[]>('/');
  }

  public updateTopic(data: TopicModel): Promise<void> {
    return this.http.put('/', { data });
  }

  public deleteTopic(data: TopicModel): Promise<void> {
    return this.http.delete('/', { data });
  }
}

export const topicsAPI = new TopicsAPI();
