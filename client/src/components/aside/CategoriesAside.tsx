import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CategoriesAside.module.scss';

const CategoriesAside = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.logotype} onClick={goHome}>
        Restaurant Service
      </div>

      <div className={styles.categories}>categories</div>
    </aside>
  );
};

export default CategoriesAside;
