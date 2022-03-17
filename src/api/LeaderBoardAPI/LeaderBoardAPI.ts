import { LeaderboardItem } from '../../types';
import BaseAPI from '../BaseAPI';

const teamName = 'snake';
const limit = 10;

class LeaderboardAPI extends BaseAPI {
  constructor() {
    super('/leaderboard');
  }

  public addItem(data: LeaderboardItem['data']): Promise<void> {
    return this.http.post('', {
      data: { data, ratingFieldName: 'awards', teamName }
    });
  }

  public getItems(): Promise<LeaderboardItem[]> {
    return this.http.post(`/${teamName}`, {
      data: {
        ratingFieldName: 'awards',
        cursor: 0,
        limit
      }
    });
  }
}

export const leaderboardAPI = new LeaderboardAPI();
