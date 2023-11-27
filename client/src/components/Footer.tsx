import React from 'react';
import { Link } from 'react-router-dom';

import gallery from '@/assets/icons/mobileApp/store_app_gallery.svg';
import appStore from '@/assets/icons/mobileApp/store_app_store.svg';
import play from '@/assets/icons/mobileApp/store_google_play.svg';
import ruStore from '@/assets/icons/mobileApp/store_ru_store.svg';

import styles from './Footer.module.scss';

const storeLinks = [
  { href: 'https://play.google.com/', src: play, alt: 'Download from google play' },
  {
    href: 'https://www.apple.com/app-store/',
    src: appStore,
    alt: 'Download from app store',
  },
  {
    href: 'https://www.huawei.ru/appgallery/',
    src: gallery,
    alt: 'Download from app gallery',
  },
  { href: 'https://www.rustore.ru/', src: ruStore, alt: 'Download from ru store' },
];

const Footer = () => {
  const footerLinks = [
    {
      event: () => {
        console.log('open faq popup');
      },
      title: 'FAQ',
    },
    { event: '/', title: 'Work in Restaurant Service' },
    { event: '/', title: 'For Restaurant Owners' },
    { event: '/', title: 'Become a courier in Restaurant Service' },
    { event: '/', title: 'Contacts' },
    { event: '/', title: 'Terms and conditions' },
    { event: '/', title: 'Privacy Policy' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <ul className={styles.footer_store}>
          {storeLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href}>
                <img src={link.src} alt={link.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.footer_links}>
        {footerLinks.map((link, index) =>
          typeof link.event === 'string' ? (
            <li key={index} className={styles.footer_links_item}>
              <Link to={link.event}>{link.title}</Link>
            </li>
          ) : (
            <li key={index} className={styles.footer_links_item}>
              {link.title}
            </li>
          ),
        )}
      </ul>
    </footer>
  );
};

export default Footer;
