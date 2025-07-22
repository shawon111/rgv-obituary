"use client";
import { useEffect, useState } from "react";
import AdminHeader from '@/components/layout/AdminHeader';
import { Button } from "@/components/ui/button";

export default function AdminObituariesPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [obituaries, setObituaries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const res = await fetch("/api/auth/me");
      if (!res.ok) { setIsAdmin(false); return; }
      const data = await res.json();
      setIsAdmin(data.user.role === "admin");
    }
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchObituaries();
    }
  }, [isAdmin]);

  async function fetchUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
  }

  async function fetchObituaries(userId?: string) {
    setLoading(true);
    let url = "/api/admin/obituaries";
    if (userId) url += `?userId=${userId}`;
    const res = await fetch(url);
    const data = await res.json();
    setObituaries(data.obituaries || []);
    setLoading(false);
  }

  async function handleDelete(obituaryId: string) {
    if (!confirm("Are you sure you want to delete this obituary?")) return;
    await fetch(`/api/admin/obituaries/${obituaryId}`, { method: "DELETE" });
    fetchObituaries(selectedUser);
  }

  function handleUserFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUser(e.target.value);
    fetchObituaries(e.target.value);
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center text-gray-600">Checking admin access...</div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center text-red-600">Access denied.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminHeader />
      <main className="flex-1 ml-64 py-16 px-8">
        <h1 className="text-2xl font-bold mb-8 text-[#6B9080]">Manage Obituaries</h1>
        <div className="mb-6">
          <label className="mr-2 font-semibold">Filter by User:</label>
          <select value={selectedUser} onChange={handleUserFilter} className="border p-2 rounded">
            <option value="">All Users</option>
            {users.map((user: any) => (
              <option key={user._id} value={user._id}>{user.firstName} {user.lastName} ({user.email})</option>
            ))}
          </select>
        </div>
        {loading ? <div>Loading obituaries...</div> : (
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-[#F6E7CB]">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {obituaries.map(ob => (
                <tr key={ob._id} className="border-t">
                  <td className="p-3">{ob.firstName} {ob.lastName}</td>
                  <td className="p-3">{ob.author?.firstName} {ob.author?.lastName} <span className="text-xs text-gray-500">({ob.author?.email})</span></td>
                  <td className="p-3">{new Date(ob.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <Button variant="destructive" onClick={() => handleDelete(ob._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
} 