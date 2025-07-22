"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminHeader from '@/components/layout/AdminHeader';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) { setIsAdmin(false); return; }
        const data = await res.json();
        setIsAdmin(data.user.role === 'admin');
      } catch { setIsAdmin(false); }
    }
    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Checking admin access...</div>;
  }
  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Access denied.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminHeader />
      <main className="flex-1 ml-64 py-16 px-8">
        <h1 className="text-3xl font-bold mb-8 text-[#6B9080]">Admin Dashboard</h1>
        <div className="space-y-6">
          <Link href="/admin/users" className="block p-6 bg-white rounded shadow hover:bg-[#F6E7CB] transition">Manage Users</Link>
          <Link href="/admin/obituaries" className="block p-6 bg-white rounded shadow hover:bg-[#F6E7CB] transition">Manage Obituaries</Link>
        </div>
      </main>
    </div>
  );
} 