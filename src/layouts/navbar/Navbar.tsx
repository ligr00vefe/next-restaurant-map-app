'use client';
import React from 'react'
import NavItem from './NavItem';
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar__logo}>restaurant</div>
        <div className={styles.navbar__list}>
          <NavItem />
        </div>
      </div>
    </>
  )
}

export default Navbar