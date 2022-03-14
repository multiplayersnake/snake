import BaseAPI from '../BaseAPI';
import { TopicModel, TopicWithTimeStamps } from '../../database/models';

class TopicsAPI extends BaseAPI {
  constructor() {
    super('/topics', '/api');
  }

  public createTopic(data: TopicModel): Promise<void> {
    return this.http.post('/', { data });
  }

  public readTopics(userId: number): Promise<TopicWithTimeStamps[]> {
    return this.http.get<TopicWithTimeStamps[]>(`/${userId}`);
  }

  public updateTopic(data: TopicModel): Promise<void> {
    return this.http.put('/', { data });
  }

  public deleteTopic(data: TopicModel): Promise<void> {
    return this.http.delete('/', { data });
  }

  public readTitle(topicId: number): Promise<string> {
    return this.http.get<string>(`/title/${topicId}`);
  }
}

export const topicsAPI = new TopicsAPI();
