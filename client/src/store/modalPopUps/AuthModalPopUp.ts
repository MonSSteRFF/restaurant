import { makeAutoObservable } from 'mobx';

class AuthModalPopUp {
  isShow = false;

  constructor() {
    makeAutoObservable(this);
  }

  open() {
    this.isShow = true;
  }
  close() {
    this.isShow = false;
  }
}

export default AuthModalPopUp;
