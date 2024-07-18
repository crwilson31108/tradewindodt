import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'TradeWave ODT' }: LayoutProps) {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();
  
    const handleLogout = () => {
      logout();
      router.push('/');
    };

    return (
        <>
        <Head>
            <title>{title}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                    <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center">
                        <Image
                        src="/logo.webp"
                        alt="TradeWave ODT Logo"
                        width={40}
                        height={40}
                        className="mr-2"
                        />
                        <span className="text-2xl font-bold text-teal-600">TradeWave ODT</span>
                    </Link>
                    </div>
                    {isLoggedIn && (
                    <div className="sm:ml-6 sm:flex sm:space-x-8">
                        <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Dashboard
                        </Link>
                        <Link href="/portfolio" className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Portfolio
                        </Link>
                        <Link href="/transactions" className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Transactions
                        </Link>
                        <Link href="/account" className="border-transparent text-gray-500 hover:border-teal-500 hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Account
                        </Link>
                    </div>
                    )}
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Log out
                    </button>
                    ) : (
                    <Link href="/login" className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        Login
                    </Link>
                    )}
                </div>
                </div>
            </nav>
            </header>
            <main className="flex-grow">
            <AnimatePresence mode="wait">
                <motion.div
                key={router.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                >
                {children}
                </motion.div>
            </AnimatePresence>
            </main>
            <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-base text-gray-400">&copy; 2024 TradeWave ODT, an <a href="https://www.investify.in/">Investify</a> Company All rights reserved.</p>
                </div>
            </div>
            </footer>
        </div>
        </>
    );
}