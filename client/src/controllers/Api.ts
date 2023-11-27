import { GetRequest } from '@/controllers/GetRequest';
import { PostRequest } from '@/controllers/PostRequest';

export const apiRoute = 'http://localhost:8080';

export interface JwtPair {
  access_token: string;
  refresh_token: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  RES_ADMIN = 'RES_ADMIN',
  RES_USER = 'RES_USER',
}

export interface I_ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

type T_ApiLogin = (
  body: { identifier: string; password: string },
  headers?: Record<string, string>,
) => Promise<JwtPair>;

type T_ApiRegister = (
  body: { email: string; login: string; password: string; additionalPassword: string },
  role: Role,
  headers?: Record<string, string>,
) => Promise<JwtPair>;

type T_ApiLogout = (headers?: Record<string, string>) => Promise<void>;
type T_ApiRefresh = (headers?: Record<string, string>) => Promise<JwtPair>;

export type T_AuthApi = {
  login: T_ApiLogin;
  register: T_ApiRegister;
  logout: T_ApiLogout;
  refresh: T_ApiRefresh;
};

type T_Api = {
  auth: T_AuthApi;
};

const Api: T_Api = {
  auth: {
    login: (body, h) => PostRequest('/auth/login', body, h),
    register: (body, role, h) => PostRequest(`/auth/register/${role}`, body, h),
    logout: (h) => GetRequest('/auth/logout', h),
    refresh: (h) => GetRequest('/auth/refresh', h),
  },
};

export default Api;
