import Link from 'next/link';
import '../styles/global.css'

const Navbar = () => (
  <nav className='navbar-link'>
    <Link className='text-no-underline' href="/">Home</Link>
    <Link className='text-no-underline' href="/uploadki67">Upload KI 67 Image</Link>
  </nav>
);

export default Navbar;