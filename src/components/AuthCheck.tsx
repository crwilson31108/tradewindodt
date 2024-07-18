import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (you might want to use a more robust method in a real app)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
