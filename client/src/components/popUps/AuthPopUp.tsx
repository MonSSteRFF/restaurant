import { observer } from 'mobx-react';
import React, { useRef } from 'react';

import { useRootModel } from '@/store/RootModel';

import styles from './AuthPopUp.module.scss';

const AuthPopUp = () => {
  const authModalPopUp = useRootModel((root) => root.popUpsService.authModalPopUp);

  const containerRef = useRef<HTMLDivElement>(null);
  const handle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current?.contains(event.target as Node)) {
      authModalPopUp.close();
    }
  };

  return (
    <div
      onClick={handle}
      className={
        authModalPopUp.isShow
          ? styles.background
          : `${styles.background} ${styles.background_hidden}`
      }
    >
      <div
        ref={containerRef}
        style={{ right: authModalPopUp.isShow ? '20px' : '-520px' }}
        className={styles.authPopUp}
      >
        Login/registration form
      </div>
    </div>
  );
};

export default observer(AuthPopUp);
