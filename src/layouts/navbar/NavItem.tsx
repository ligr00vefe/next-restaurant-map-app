'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import NavBtn from './NavBtn';
import styles from './Navbar.module.scss';
import { useSession, signOut } from 'next-auth/react';

const NavItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, status } = useSession();
  console.log(data, status);

  return (
    <>
      <ul className={styles['navbar__list--items']}>
        <li>
          <Link href='/stores' className={styles['navbar__list--item']}>맛집 목록</Link>
        </li>
        <li>
          <Link href='/stores/new' className={styles['navbar__list--item']}>맛집 등록</Link> 
        </li>
        <li>
          <Link href='/users/likes' className={styles['navbar__list--item']}>찜한 가게</Link> 
        </li>       
        <li>
          {status === 'authenticated' ? (
            <button type='button' onClick={() => signOut()}>로그아웃</button>
          ): (
            <Link href='/api/auth/signin' className={styles['navbar__list--item']}>로그인</Link>
          )}
        </li>
      </ul>

      {/* mobile button */}
      <div className={styles['navbar__button']}>
        <NavBtn isOpen={isOpen} />
      </div>
    </>
  )
}

export default NavItem