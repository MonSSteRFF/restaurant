import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CartAside from '@/components/aside/CartAside';
import CategoriesAside from '@/components/aside/CategoriesAside';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';

import styles from './AppRouter.module.scss';

const AppRouter = () => {
  return (
    <main className={styles.main}>
      <CategoriesAside />

      <section className={styles.section}>
        <div className={styles.section_content}>
          <Routes>
            <Route path={'/'} element={<Home />} />
          </Routes>
        </div>

        <Footer />
      </section>

      <CartAside />
    </main>
  );
};

export default AppRouter;
