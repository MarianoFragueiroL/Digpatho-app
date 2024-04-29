import Link from 'next/link';
import '../styles/global.css'

const Navbar = () => (
  <nav className='navbar-link'>
    <Link className='text-no-underline' href="/">Home</Link>
    <Link className='text-no-underline' href="/login">Login</Link>
    {/* <Link className='text-no-underline' href="/logout">Logout</Link> */}
  </nav>
);

export default Navbar;