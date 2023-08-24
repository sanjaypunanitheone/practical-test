import axios from 'axios';
import qs from 'qs';
import {BASE_URL} from '../utils/constant';

type ClientProps = {
  method?: string;
  url?: string;
  data?: any;
  useCache?: boolean;
  invalidateQuery?: boolean;
};

export const METHODS = {
  GET: 'get',
  DELETE: 'delete',
  HEAD: 'head',
  OPTIONS: 'options',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
};
const axiosConfig = {
  baseURL: BASE_URL,
};
function createAxiosInstance() {
  return axios.create(axiosConfig);
}
const request = createAxiosInstance();
const cache: any = {};

const client = ({
  method = METHODS.POST,
  url = BASE_URL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}: ClientProps) =>
  useCache && !invalidateQuery && cache[url]
    ? Promise.resolve(cache[url])
    : request({
        method,
        url,
        data,
        paramsSerializer,
        ...rest,
      });

export const clientWithHeaders = ({
  method = METHODS.POST,
  url = BASE_URL,
  data,
  ...rest
}: ClientProps) =>
  request({
    method,
    url,
    data,
    paramsSerializer,
    ...rest,
  }).then(res => {
    return res;
  });

request.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    const originalRequest = err.config;
    const status = err.response?.status;
    if (status === 503) {
      const error = {
        originalRequest,
        status,
        message:
          'This service is unavailable right now, please try again later',
      };
      throw error;
    }
    if (status === 500) {
      const error = {
        originalRequest,
        status,
        message: 'An unexpected error occurred, please try again later',
      };
      throw error;
    }
    if (status === 404) {
      const error = {
        originalRequest,
        status,
        message: 'The requested content does not exist, please try again later',
      };
      throw error;
    }

    const response = err.response?.data;
    const message = response ? response : err.message;

    const error = {originalRequest, message, status};
    throw error;
  },
);
export function setHeaderToken(token: string) {
  if (token) {
    request.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete request.defaults.headers.Authorization;
  }
}

function paramsSerializer(params: any) {
  return qs.stringify(params, {arrayFormat: 'repeat'});
}

export default client;
