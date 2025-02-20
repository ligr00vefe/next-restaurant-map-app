import React from 'react'
import { BiMenu } from  'react-icons/bi';
import { AiOutlineClose } from  'react-icons/ai';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import { useSession, signOut } from 'next-auth/react';

interface INavBtnProps {
  isOpen: boolean;
}

const NavBtn = (isOpen:INavBtnProps) => {

  const { data, status } = useSession();
  
  return (
    <>
      {isOpen ? <AiOutlineClose /> : <BiMenu />};

      {isOpen && (
        <div className={styles['navbar__list--mobile']}>
          <ul>
            <li>
              <Link href='/stores' className={styles['navbar__list--item--mobile']}>맛집 목록</Link>
            </li>
            <li>
              <Link href='/stores/new' className={styles['navbar__list--item--mobile']}>맛집 등록</Link> 
            </li>
            <li>
              <Link href='/users/likes' className={styles['navbar__list--item--mobile']}>찜한 가게</Link> 
            </li>
            <li>
              {status === 'authenticated' ? (
                <button type='button' onClick={() => signOut()}>로그아웃</button>
              ): (
                <Link href='/api/auth/signin' className={styles['navbar__list--item--mobile']}>로그인</Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default NavBtn