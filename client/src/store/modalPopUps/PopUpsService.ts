import AuthModalPopUp from '@/store/modalPopUps/AuthModalPopUp';

class PopUpsService {
  authModalPopUp!: AuthModalPopUp;

  constructor() {
    this.authModalPopUp = new AuthModalPopUp();
  }
}

export default PopUpsService;
