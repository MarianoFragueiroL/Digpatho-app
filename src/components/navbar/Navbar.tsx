import Link from 'next/link';
import '../../styles/global.css'
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { useLoginContext, useAllowedContext, useLoggedContext } from '../../context/AppContext';
import { allUrl } from '@/types/urlsvariables';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog,faUser } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '../dropdown/dopdownbox';


const Navbar: React.FC = () => {
  const { isLogin } = useLoginContext();
  const { isAllowed } = useAllowedContext();
  const { isLogged } = useLoggedContext();

  
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
        <div className={styles.navIconLinkContainer}>
          <ul className={styles.navbarLinks}>
            <li ><Link className={styles.navbarLink} href={allUrl.homeUrl} >
                  Home
                </Link>
            </li>
              { isLogged && isAllowed &&(
                  <DropdownMenu label={'KI 67'}>
                    <li><Link className={styles.navbarLink} href={allUrl.uploadki67}>Process KI 67 Image</Link></li>
                  </DropdownMenu>
              )}
          </ul>
        </div>
        <div className={styles.navConfigEnd}>
            { !isLogged &&(
              <ul>
                <Link href= {allUrl.loginUrl} className={styles.buttonLogin}>Login</Link>
            </ul>
            )}
            { isLogged &&(
              <ul className={styles.height}>
                <div className={'d-flex justify-content-around '+styles.height}>
                  <DropdownMenu icon={<FontAwesomeIcon icon={faCog} className={styles.icon} />}>
                    <li><Link href={allUrl.profileUrl}>Profile</Link></li>
                    <li><Link href={allUrl.logoutUrl}>Logout</Link></li>
                  </DropdownMenu>
                </div>
              </ul>
            )}
        </div>
    </div>
  </nav>
)};

export default Navbar;