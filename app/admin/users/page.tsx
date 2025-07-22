"use client";
import { useEffect, useState } from "react";
import AdminHeader from '@/components/layout/AdminHeader';
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ firstName: "", lastName: "", email: "", password: "", role: "family" });
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      const res = await fetch("/api/auth/me");
      if (!res.ok) { setIsAdmin(false); return; }
      const data = await res.json();
      setIsAdmin(data.user.role === "admin");
      setCurrentUserId(data.user.id || data.user._id);
    }
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  async function handleDelete(userId: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    fetchUsers();
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    if (!res.ok) {
      const data = await res.json();
      setAddError(data.error || "Failed to add user");
    } else {
      setShowAdd(false);
      setAddForm({ firstName: "", lastName: "", email: "", password: "", role: "family" });
      fetchUsers();
    }
    setAddLoading(false);
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center text-gray-600">Checking admin access...</div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center text-red-600">Access denied.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminHeader />
      <main className="flex-1 ml-64 py-16 px-8">
        <h1 className="text-2xl font-bold mb-8 text-[#6B9080]">Manage Users</h1>
        <Button onClick={() => setShowAdd(v => !v)} className="mb-6">{showAdd ? "Cancel" : "Add New User"}</Button>
        {showAdd && (
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow mb-8 space-y-4">
            {addError && <div className="text-red-600 mb-2">{addError}</div>}
            <div className="flex gap-4">
              <input required className="border p-2 rounded w-full" placeholder="First Name" value={addForm.firstName} onChange={e => setAddForm(f => ({ ...f, firstName: e.target.value }))} />
              <input required className="border p-2 rounded w-full" placeholder="Last Name" value={addForm.lastName} onChange={e => setAddForm(f => ({ ...f, lastName: e.target.value }))} />
            </div>
            <div className="flex gap-4">
              <input required className="border p-2 rounded w-full" placeholder="Email" type="email" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} />
              <input required className="border p-2 rounded w-full" placeholder="Password" type="password" value={addForm.password} onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <div>
              <select className="border p-2 rounded" value={addForm.role} onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))}>
                <option value="family">Family</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button type="submit" disabled={addLoading}>{addLoading ? "Adding..." : "Add User"}</Button>
          </form>
        )}
        {loading ? <div>Loading users...</div> : (
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-[#F6E7CB]">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">{user.firstName} {user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {user._id === currentUserId ? (
                      <Button variant="destructive" disabled title="You can't delete your own admin account">Delete</Button>
                    ) : (
                      <Button variant="destructive" onClick={() => handleDelete(user._id)}>Delete</Button>
                    )}
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