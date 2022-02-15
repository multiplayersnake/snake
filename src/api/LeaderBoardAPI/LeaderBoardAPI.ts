import BaseAPI from '../BaseAPI';

export type LeaderItem = {
  data: {
    user: string;
    awards: number;
  };
};

export type UserResultData = {
  user: string;
  awards: number;
};

class LeaderBoardAPI extends BaseAPI {
  constructor() {
    super('/leaderboard');
  }

  public setUserResult(userData: UserResultData): Promise<void> {
    console.log({
      data: { data: userData, ratingFieldName: 'awards', teamName: 'snake' }
    });
    return this.http.post('', {
      data: { data: userData, ratingFieldName: 'awards', teamName: 'snake' }
    });
  }

  public getLeaderList(): Promise<LeaderItem[]> {
    return this.http.post('/snake', {
      data: {
        ratingFieldName: 'awards',
        cursor: 0,
        limit: 10
      }
    });
  }
}

export const leaderBoardAPI = new LeaderBoardAPI();
