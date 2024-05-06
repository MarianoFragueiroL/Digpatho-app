import Link from 'next/link';
import '../styles/global.css'
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { inLogginContext, isAllowedContext, isLoggedContext } from '../context/AppContext';
import { allUrl } from '@/types/urlsvariables';

const Navbar: React.FC = () => {
  const { isLogin } = inLogginContext();
  const { isAllowed } = isAllowedContext();
  const { isLogged } = isLoggedContext();

  
  useEffect(() => {   
    return () => {}
  }, [isLogged]);

  if (isLogin) return null;
  return (
  <nav className={styles.navbar}>
    <div className={styles.navbarImgcontainer}>
      <img src="/images/Logo4.jpg" alt="Logo" className={styles.navbarLogo}  />
    </div>
    <div className={styles.navbarLinksContainer}>
      <ul className={styles.navbarLinks}>
        <li ><Link className={styles.navbarLink} href={allUrl.homeUrl} >
              Inicio
            </Link>
        </li>
          { isLogged && isAllowed &&(
            <li ><Link className={styles.navbarLink} href={allUrl.uploadki67}>Upload KI 67 Image</Link></li>
          )}
      </ul>
      <ul>
        { !isLogged &&(
          <Link href= {allUrl.loginUrl} className={styles.buttonDemo}>Login</Link>
        )}
        { isLogged &&(
          <Link href= {allUrl.logoutUrl} className={styles.buttonDemo}>Logout</Link>
        )}
      </ul>
    </div>
  </nav>
)};

export default Navbar;