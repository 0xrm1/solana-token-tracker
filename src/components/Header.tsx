import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Solana Token Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                router.pathname === '/' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/portfolio" 
              className={`text-sm font-medium transition-colors ${
                router.pathname === '/portfolio' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Portföy
            </Link>
            <Link 
              href="/explore" 
              className={`text-sm font-medium transition-colors ${
                router.pathname === '/explore' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Keşfet
            </Link>
            <a 
              href="https://solana.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Solana
            </a>
          </nav>

          {/* Wallet Button */}
          <div className="flex items-center">
            <WalletMultiButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200" />
            
            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden text-gray-400 hover:text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${
                  router.pathname === '/' 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/portfolio" 
                className={`text-sm font-medium transition-colors ${
                  router.pathname === '/portfolio' 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                Portföy
              </Link>
              <Link 
                href="/explore" 
                className={`text-sm font-medium transition-colors ${
                  router.pathname === '/explore' 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                Keşfet
              </Link>
              <a 
                href="https://solana.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={closeMenu}
              >
                Solana
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;