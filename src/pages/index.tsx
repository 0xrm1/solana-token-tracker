import { Watchlist } from '@/components/Watchlist';
import { BuySellModule } from '@/components/BuySellModule';
import { Geist } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    // Kullanıcı girişi kontrolü
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsLoggedIn(true);
        setUsername(user.username || '');
      } catch (err) {
        console.error('User data parsing error:', err);
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
  };
  
  return (
    <div className={`${geistSans.className} min-h-screen bg-[#1b2839] text-white`}>
      {/* Top Strip */}
      <div className="w-full h-16 border border-gray-700 rounded-lg mb-4 mx-auto mt-4 max-w-[95%]">
        <div className="h-full flex items-center justify-between px-4">
          <h1 className="text-xl font-bold text-white">Solana Token Tracker</h1>
          
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-300">Merhaba, {username}</span>
                <button
                  onClick={() => router.push('/wallets')}
                  className="px-3 py-1 bg-[#2a3a4f] border border-gray-700 rounded-md hover:bg-[#3a4a5f] text-sm"
                >
                  Cüzdanlarım
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-[#c8ec64] text-[#1b2839] rounded-md hover:bg-[#b8dc54] text-sm font-medium"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1 bg-[#2a3a4f] border border-gray-700 rounded-md hover:bg-[#3a4a5f] text-sm"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 bg-[#c8ec64] text-[#1b2839] rounded-md hover:bg-[#b8dc54] text-sm font-medium"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      <main className="px-4 max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
          {/* Left Column - Modules (30%) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Row - Module 1 and 2 side by side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Module 1 */}
              <div className="bg-[#2a3a4f] border border-gray-700 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-lg font-semibold text-[#c8ec64]">Module 1</h3>
                  <p className="text-sm text-gray-300 mt-2">Coming soon</p>
                </div>
              </div>
              
              {/* Module 2 */}
              <div className="bg-[#2a3a4f] border border-gray-700 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-lg font-semibold text-[#c8ec64]">Module 2</h3>
                  <p className="text-sm text-gray-300 mt-2">Coming soon</p>
                </div>
              </div>
            </div>
            
            {/* Bottom Row - Module 3 horizontal */}
            <div className="bg-[#2a3a4f] border border-gray-700 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center p-4 w-full">
                <h3 className="text-lg font-semibold text-[#c8ec64]">Module 3</h3>
                <p className="text-sm text-gray-300 mt-2">Coming soon</p>
                <div className="mt-4 p-3 bg-[#1b2839] rounded-lg">
                  <ul className="text-left space-y-2 text-xs">
                    <li className="flex items-center">
                      <span className="mr-2 text-[#c8ec64]">•</span>
                      <span>Advanced token analytics</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-[#c8ec64]">•</span>
                      <span>Price alerts</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-[#c8ec64]">•</span>
                      <span>Portfolio tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Module 4 (70%) */}
          <div className="lg:col-span-7 bg-[#2a3a4f] border border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-white">Module 4</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
              {/* Module 5 - Watchlist (30% of Module 4) */}
              <div className="lg:col-span-3 bg-[#243447] border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-[#c8ec64]">Watchlist (Module 5)</h3>
                <Watchlist />
              </div>
              
              {/* Module 6 - Buy-Sell (70% of Module 4) */}
              <div className="lg:col-span-7 bg-[#243447] border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-[#c8ec64]">Buy-Sell (Module 6)</h3>
                <BuySellModule />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#1b2839] mt-8 max-w-[95%] mx-auto">
        <div className="py-4 px-4 text-center text-xs text-gray-400">
          <p>Built using Jupiter API</p>
        </div>
      </footer>
    </div>
  );
}