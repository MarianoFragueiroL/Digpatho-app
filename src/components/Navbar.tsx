import Link from 'next/link';
import '../styles/global.css'
import styles from './Navbar.module.css';
import Image from 'next/image';
import { useAppContext } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { isLogin } = useAppContext();

  // No renderizar el Navbar si isLogin es true
  if (isLogin) return null;
  return (
  <nav className={styles.navbar}>
    <div className={styles.navbarImgcontainer}>
      <img src="/images/Logo4.jpg" alt="Logo" className={styles.navbarLogo}  />
    </div>
    <div className={styles.navbarLinksContainer}>
      <ul className={styles.navbarLinks}>
        <li ><Link className={styles.navbarLink} href="/">
          Inicio
          </Link></li>
        <li ><Link className={styles.navbarLink} href="/uploadki67">Upload KI 67 Image</Link></li>
      </ul>
      <Link href="/login" className={styles.buttonDemo}>Login</Link>
    </div>
  </nav>
)};

export default Navbar;