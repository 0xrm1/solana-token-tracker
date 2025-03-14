import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Bileşenler
import WalletContextProvider from '@/components/WalletContextProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TokenDetails from '@/components/TokenDetails';
import TransactionHistory from '@/components/TransactionHistory';

export default function TokenPage() {
  const router = useRouter();
  const { mint } = router.query;
  const { connected, publicKey } = useWallet();
  
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!mint || !connected || !publicKey) return;
      
      try {
        setLoading(true);
        setError('');
        
        // Solana mainnet bağlantısı
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        
        // Token mint adresi
        const mintAddress = new PublicKey(mint);
        
        // Token metadata bilgilerini getir
        // Not: Gerçek uygulamada burada token metadata'sını çekmek için
        // Metaplex veya başka bir API kullanılabilir
        
        // Örnek token verisi
        const tokenData = {
          mint: mint,
          name: 'Token Name', // Gerçek uygulamada API'den alınacak
          symbol: 'TKN',      // Gerçek uygulamada API'den alınacak
          logoUrl: '/token-placeholder.png',
          decimals: 9,
          totalSupply: '1000000000',
          price: 0.05,
          change24h: 2.5,
        };
        
        // Son işlemleri getir
        // Not: Gerçek uygulamada burada Solana Explorer API veya
        // başka bir servis kullanılabilir
        
        // Örnek işlem verileri
        const transactionData = [
          {
            signature: '5xq7kM9VQjJ1qUgGCKgXwcjK3HZVEGk8xzSg7YmEPQzNAJ4GyKs1bQsxoJhZJAkNcP5F8T4JT6rzWYhQpCrnmyZV',
            blockTime: Date.now() - 3600000,
            type: 'transfer',
            amount: 100,
            from: publicKey.toString(),
            to: 'DRxKJ9NBHzgLNKKqG6v9gKZQ8HJNYXhYcbGe6TY3KkJp',
          },
          {
            signature: '2W2KfjBsZfAH9L4GuBQ52AyiP4RVwGbCeEVDovnP3fFNxG8oJhKJ1qUgGCKgXwcjK3HZVEGk8xzSg7YmEPQzNAJ4',
            blockTime: Date.now() - 86400000,
            type: 'transfer',
            amount: 50,
            from: 'DRxKJ9NBHzgLNKKqG6v9gKZQ8HJNYXhYcbGe6TY3KkJp',
            to: publicKey.toString(),
          },
        ];
        
        setToken(tokenData);
        setTransactions(transactionData);
      } catch (err) {
        console.error('Token detayları alınırken hata oluştu:', err);
        setError('Token detayları alınamadı. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [mint, connected, publicKey]);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Head>
          <title>{token ? `${token.name} (${token.symbol})` : 'Token Detayları'} | Solana Token Tracker</title>
          <meta name="description" content={`${token?.name || 'Token'} detayları ve işlem geçmişi`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="container mx-auto px-4 py-8">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Ana Sayfaya Dön
          </button>

          {!connected ? (
            <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
              <p className="text-xl mb-6">Token detaylarını görüntülemek için cüzdanınızı bağlayın.</p>
              <WalletMultiButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200" />
            </div>
          ) : loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-6 py-4 rounded-lg">
              {error}
            </div>
          ) : token ? (
            <div className="space-y-8">
              <TokenDetails token={token} />
              
              <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">İşlem Geçmişi</h2>
                <TransactionHistory transactions={transactions} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
              <p className="text-xl">Token bulunamadı.</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </WalletContextProvider>
  );
}