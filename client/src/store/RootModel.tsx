import React, { createContext, useContext } from 'react';

import Api from '@/controllers/Api';
import PopUpsService from '@/store/modalPopUps/PopUpsService';
import AuthService from '@/store/services/AuthService';

export class RootModel {
  authService!: AuthService;

  popUpsService!: PopUpsService;

  constructor() {
    this.authService = new AuthService(Api.auth);
    this.popUpsService = new PopUpsService();
  }
}

const rootModel = new RootModel();

// const refreshRootModel = () => {
//   rootModel = new RootModel();
// };

const RootModelContext = createContext<RootModel>(rootModel);

export const RootModelContextProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  return (
    <RootModelContext.Provider value={rootModel}>
      {props.children}
    </RootModelContext.Provider>
  );
};

export function useRootModel<Result>(selector: (value: RootModel) => Result) {
  const store = useContext(RootModelContext);

  if (store === undefined || store === null) {
    throw new Error('Can not `useRootModel` outside of the `RootModelContextProvider`');
  }

  return selector(store);
}
