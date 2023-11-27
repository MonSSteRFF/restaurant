import React, { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

import styles from './ReloadPromt.module.scss';

const intervalMS = 60 * 60 * 1000;

const ReloadPromt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onNeedRefresh: () => {
      console.log('need refresh');
    },
    onOfflineReady: () => {
      console.log('offline ready');
    },
    onRegisteredSW(swUrl, r) {
      r &&
        setInterval(async () => {
          if (!(!r.installing && navigator)) return;

          if ('connection' in navigator && !navigator.onLine) return;

          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache',
            },
          });

          if (resp?.status === 200) await r.update();
        }, intervalMS);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    (offlineReady || needRefresh) && (
      <div className={styles.reloadPromt}>
        <div className={styles.reloadPromt_toast}>
          {offlineReady ? (
            <p className={styles.reloadPromt_title}>App ready to work offline</p>
          ) : (
            <p className={styles.reloadPromt_title}>
              New content available, <br />
              click on reload button to update.
            </p>
          )}

          <div className={styles.reloadPromt_buttons}>
            {needRefresh && (
              <button
                className={styles.reloadPromt_button}
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            )}

            <button className={styles.reloadPromt_button} onClick={() => close()}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReloadPromt;
