import React, { useState } from 'react'
import { BiMenu } from  'react-icons/bi';
import { AiOutlineClose } from  'react-icons/ai';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import { useSession, signOut } from 'next-auth/react';

const NavBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, status } = useSession();
  
  return (
    <>
      <div
          role="presentation"
          className={styles['navbar__button']}
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
      </div>

      {isOpen && (
        <div className={styles['navbar--mobile']}>
          <ul className={styles['navbar__list--mobile']}>
            <li>
              <Link 
                href='/stores' 
                className={styles['navbar__list--item--mobile']}
                onClick={() => setIsOpen(false)}
              >맛집 목록</Link>
            </li>
            <li>
              <Link 
                href='/stores/new' 
                className={styles['navbar__list--item--mobile']}
                onClick={() => setIsOpen(false)}
              >맛집 등록</Link> 
            </li>
            <li>
              <Link 
                href='/users/likes' 
                className={styles['navbar__list--item--mobile']}
                onClick={() => setIsOpen(false)}
              >찜한 가게</Link> 
            </li>
            <li>
              <Link 
                href='/users/mypage' 
                className={styles['navbar__list--item--mobile']}
                onClick={() => setIsOpen(false)}
              >마이페이지</Link> 
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