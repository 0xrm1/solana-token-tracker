# Solana Token Tracker - Frontend

Bu proje, Solana blockchain üzerinde token takibi ve işlemleri yapmanızı sağlayan bir web uygulamasının frontend kısmıdır.

## Özellikler

- Kullanıcı kaydı ve girişi
- Solana cüzdanı oluşturma ve yönetme
- Token fiyatlarını takip etme
- Token alım-satım işlemleri

## Teknolojiler

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Zustand (State yönetimi)
- Solana Web3.js

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/0xrm1/solana-token-tracker.git
cd solana-token-tracker
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyasını oluşturun:
```
NEXT_PUBLIC_API_URL=https://quicky-trade-env.eba-my3ep4mp.us-east-1.elasticbeanstalk.com/api
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Derleme

Projeyi production için derlemek:

```bash
npm run build
```

Derlenen uygulamayı çalıştırmak:

```bash
npm run start
```

## Deployment

Bu proje Vercel'e deploy edilebilir. GitHub reposunu Vercel'e bağlayın ve aşağıdaki çevre değişkenini ayarlayın:

```
NEXT_PUBLIC_API_URL=https://quicky-trade-env.eba-my3ep4mp.us-east-1.elasticbeanstalk.com/api
```

## Lisans

MIT