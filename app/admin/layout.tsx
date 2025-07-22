import AdminHeader from '@/components/layout/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminHeader />
      <main className="flex-1 ml-64 py-16 px-8">{children}</main>
    </div>
  );
} 