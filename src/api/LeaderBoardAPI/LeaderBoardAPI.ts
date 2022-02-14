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

export type SignInRequest = {
  login: string;
  password: string;
};

class LeaderBoardAPI extends BaseAPI {
  constructor() {
    super('');
  }

  public setUserResult(userData: UserResultData): Promise<void> {
    console.log({
      data: { data: userData, ratingFieldName: 'awards', teamName: 'snake' }
    });
    return this.http.post('/leaderboard', {
      data: { data: userData, ratingFieldName: 'awards', teamName: 'snake' }
    });
  }

  public getLeaderList(): Promise<LeaderItem[]> {
    return this.http.post('/leaderboard/snake', {
      data: {
        ratingFieldName: 'awards',
        cursor: 0,
        limit: 10
      }
    });
  }
}

export const leaderBoardAPI = new LeaderBoardAPI();
