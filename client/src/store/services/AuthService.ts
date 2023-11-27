import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { I_ErrorResponse, Role, T_AuthApi } from '@/controllers/Api';

class AuthService {
  access_token!: string;
  refresh_token!: string;

  constructor(readonly authApi: T_AuthApi) {
    makeAutoObservable(this);
    makePersistable(this, {
      expireIn: 900000, // 15m
      name: 'AuthService',
      properties: ['access_token'],
      storage: localStorage,
    });
  }

  login = async (body: { identifier: string; password: string }) => {
    return await this.request(async () => {
      const jwtPair = await this.authApi.login(body);
      runInAction(() => {
        this.access_token = jwtPair.access_token;
        this.refresh_token = jwtPair.refresh_token;
      });
    });
  };

  register = async (
    body: { email: string; login: string; password: string; additionalPassword: string },
    role: Role,
  ) => {
    return await this.request(async () => {
      const jwtPair = await this.authApi.register(body, role);
      runInAction(() => {
        this.access_token = jwtPair.access_token;
        this.refresh_token = jwtPair.refresh_token;
      });
    });
  };

  logout = async () => {
    return await this.request(async () => {
      await this.authApi.logout({ Authorization: this.access_token });
    });
  };

  refresh = async () => {
    return await this.request(async () => {
      const jwtPair = await this.authApi.refresh({ Authorization: this.access_token });
      runInAction(() => {
        this.access_token = jwtPair.access_token;
        this.refresh_token = jwtPair.refresh_token;
      });
    });
  };

  private async request<Response>(callback: () => Promise<Response>) {
    try {
      await callback();
      return { success: true, error: undefined };
    } catch (e) {
      return { success: false, error: e as I_ErrorResponse };
    }
  }
}

export default AuthService;
