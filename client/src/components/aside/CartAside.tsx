import { observer } from 'mobx-react';
import React from 'react';

import { useRootModel } from '@/store/RootModel';

import styles from './CardAside.module.scss';

const CartAside = () => {
  const authModalPopUp = useRootModel((root) => root.popUpsService.authModalPopUp);

  return (
    <aside className={styles.aside}>
      <button className={styles.loginButton} onClick={() => authModalPopUp.open()}>
        Sing Up
      </button>

      <div className={styles.cart}>cart or map</div>
    </aside>
  );
};

export default observer(CartAside);
