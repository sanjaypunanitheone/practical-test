import client, {METHODS} from './client';

type UsersParams = {
  results: number;
  page: number;
};

export const api = {
  auth: {
    login: (params: any) =>
      client({
        url: '/api/login',
        data: params,
        method: METHODS.POST,
      }),
  },
  users: {
    get: (params: UsersParams) =>
      client({
        url: `/api?results=${params.results}&page=${params.page}`,
        method: METHODS.GET,
      }),
  },
};
