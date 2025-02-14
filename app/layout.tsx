import type { Metadata } from 'next';
import { Alegreya_Sans } from 'next/font/google';
import './globals.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const alegreyaSans = Alegreya_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alegreya-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Is this Vegan?',
  description: 'An app to check ingredients',
}

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="en" data-theme="retro">
    <head>
      <link rel="icon" href="/favicon.png" />
    </head>
    <body className={`${alegreyaSans.className} antialiased flex flex-col min-h-screen`}>
      <div className="bg-[url('/images/plant2.svg')] bg-[80%_5%] absolute top-0 bottom-0 left-0 right-0 bg-no-repeat pointer-events-none h-full"></div>
      <div className="bg-[url('/images/plant1.svg')] bg-[100%_10%] absolute top-0 bottom-0 left-0 right-0 bg-no-repeat pointer-events-none h-full"></div>
      <div className="bg-[url('/images/lines.svg')] bg-[0%_5%] absolute top-0 bottom-0 left-0 right-0 bg-no-repeat pointer-events-none h-full"></div>
      <Header />
      <main className="w-90% mx-5% lg:mx-auto lg:max-w-1280px mt-40px flex-1">
        {children}
      </main>
      <Footer />
    </body>
  </html>
}