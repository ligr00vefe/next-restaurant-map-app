'use client';
import Link from 'next/link'
import React from 'react'
import styles from './Navbar.module.scss';
import { useSession, signOut } from 'next-auth/react';

const NavItem = () => {
  const { data, status } = useSession();
  // console.log(data, status);

  return (
    <>
      <ul>
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
          <Link href='/users/mypage' className={styles['navbar__list--item']}>마이페이지</Link> 
        </li>       
        <li>
          {status === 'authenticated' ? (
            <button type='button' onClick={() => signOut()}>로그아웃</button>
          ): (
            <Link href='/api/auth/signin' className={styles['navbar__list--item']}>로그인</Link>
          )}
        </li>
      </ul>
    </>
  )
}

export default NavItem