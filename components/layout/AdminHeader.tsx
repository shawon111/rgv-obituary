"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LogOut, Users, FileText, Home } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {}
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
    { href: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5 mr-2" /> },
    { href: '/admin/obituaries', label: 'Obituaries', icon: <FileText className="w-5 h-5 mr-2" /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#222] text-white flex flex-col z-50 shadow-lg">
      <div className="flex items-center h-16 px-6 border-b border-[#333]">
        <span className="text-xl font-bold tracking-wide text-[#6B9080]">Admin Panel</span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 rounded-lg transition font-medium ${pathname === link.href ? 'bg-[#6B9080] text-white' : 'hover:bg-[#333] text-gray-200'}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-[#333] flex flex-col gap-2">
        {user && (
          <div className="mb-2 text-sm text-gray-300">
            <div className="font-semibold">{user.firstName} {user.lastName}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-lg bg-[#6B9080] hover:bg-[#55706a] text-white font-semibold transition"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
} 