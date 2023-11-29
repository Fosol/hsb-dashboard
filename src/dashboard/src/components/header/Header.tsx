'use client';

import { usePathname } from 'next/navigation';
import { Fa500Px } from 'react-icons/fa';
import { AuthState } from '../auth';

export const Header: React.FC = () => {
  const path = usePathname();

  const isLogin = path.includes('/login');

  return (
    <header className="flex flex-row p-5 bg-blue border-b-2 border-yellow text-white">
      <div className="flex-1 flex flex-row gap-4">
        <Fa500Px className="flex-no-shrink fill-current" size="50px" />
        <div className="border-l-2 p-2 text-2xl font-light">Storage Dashboard</div>
      </div>
      {!isLogin && <AuthState />}
    </header>
  );
};