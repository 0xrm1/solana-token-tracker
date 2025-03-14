import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Wallet context provider bileşeni
import WalletContextProvider from '@/components/WalletContextProvider';

// Bileşenler
import TokenList from '@/components/TokenList';
import TokenDetails from '@/components/TokenDetails';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);

  // Kullanıcının token'larını getir
  useEffect(() => {
    const fetchTokens = async () => {
      if (!connected || !publicKey) return;
      
      try {
        setLoading(true);
        setError('');
        
        // Solana mainnet bağlantısı
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        
        // Token hesaplarını getir
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_PROGRAM_ID }
        );
        
        // Token verilerini düzenle
        const tokenData = tokenAccounts.value.map((account) => {
          const parsedInfo = account.account.data.parsed.info;
          const tokenAmount = parsedInfo.tokenAmount;
          
          return {
            mint: parsedInfo.mint,
            owner: parsedInfo.owner,
            amount: tokenAmount.uiAmount,
            decimals: tokenAmount.decimals,
            address: account.pubkey.toBase58(),
          };
        });
        
        setTokens(tokenData);
      } catch (err) {
        console.error('Token bilgileri alınırken hata oluştu:', err);
        setError('Token bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [connected, publicKey]);

  // Token seçildiğinde detay sayfasına yönlendir
  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    router.push(`/token/${token.mint}`);
  };

  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Head>
          <title>Solana Token Tracker</title>
          <meta name="description" content="Track your Solana tokens and NFTs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Solana Token Tracker
            </h1>
            <p className="text-xl text-gray-300 text-center max-w-2xl mb-8">
              Cüzdanınızdaki Solana token'larını takip edin, değerlerini görüntüleyin ve transferlerinizi yönetin.
            </p>
            
            <div className="mb-8">
              <WalletMultiButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200" />
            </div>
          </div>

          {connected ? (
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Cüzdan Tokenleri</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded-lg">
                  {error}
                </div>
              ) : tokens.length > 0 ? (
                <TokenList tokens={tokens} onSelectToken={handleTokenSelect} />
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>Cüzdanınızda token bulunamadı.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
              <p className="text-xl mb-6">Tokenlerinizi görüntülemek için cüzdanınızı bağlayın.</p>
              <img 
                src="/connect-wallet.svg" 
                alt="Connect Wallet" 
                className="mx-auto h-48 opacity-70"
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </WalletContextProvider>
  );
}