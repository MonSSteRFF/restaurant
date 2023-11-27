import React from 'react';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <>
      <div className={styles.search}>
        <form className={styles.search_form}>
          <input
            placeholder={'Search in Restaurant Service'}
            className={styles.search_input}
          />
        </form>
      </div>

      <div className={styles.home_content}>
        <p style={{ marginBottom: 20 }}>cards of restaurants</p>

        <p style={{ marginBottom: 20 }}>most popular menu positions cards</p>

        <p style={{ marginBottom: 20 }}>sales cards</p>

        <p style={{ marginBottom: 20 }}>cards by most popular 5 categories</p>
      </div>
    </>
  );
};

export default Home;
