'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DashboardPage() {
  const [obituaries, setObituaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMyObituaries();
  }, []);

  const fetchMyObituaries = async () => {
    try {
      const response = await fetch('/api/obituaries/my');
      if (response.ok) {
        const data = await response.json();
        setObituaries(data.obituaries);
      }
    } catch (error) {
      console.error('Error fetching obituaries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/obituaries/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setObituaries(obituaries.filter((obit: any) => obit._id !== id));
      }
    } catch (error) {
      console.error('Error deleting obituary:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const stats = {
    total: obituaries.length,
    published: obituaries.filter((obit: any) => obit.isPublished).length,
    drafts: obituaries.filter((obit: any) => !obit.isPublished).length,
    totalViews: obituaries.reduce((sum: number, obit: any) => sum + obit.viewCount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your obituaries and family memories
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Obituaries</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Eye className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Edit className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
                <p className="text-sm text-gray-600">Drafts</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Obituaries</h2>
          <Link href="/dashboard/create">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create New Obituary</span>
            </Button>
          </Link>
        </div>

        {/* Obituaries List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your obituaries...</p>
          </div>
        ) : obituaries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No obituaries yet</h3>
              <p className="text-gray-600 mb-6">Create your first obituary to get started.</p>
              <Link href="/dashboard/create">
                <Button>Create Your First Obituary</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {obituaries.map((obituary: any) => (
              <Card key={obituary._id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {obituary.firstName} {obituary.lastName}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          obituary.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {obituary.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{obituary.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(obituary.dates.birthDate), 'MMM dd, yyyy')} - 
                            {format(new Date(obituary.dates.deathDate), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{obituary.viewCount} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Updated {format(new Date(obituary.updatedAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {obituary.isPublished && (
                        <Link href={`/obituaries/${obituary._id}`} target="_blank">
                          <Button variant="outline" size="sm" className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Button>
                        </Link>
                      )}
                      <Link href={`/dashboard/edit/${obituary._id}`}>
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the obituary for {obituary.firstName} {obituary.lastName}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(obituary._id)}
                              disabled={deletingId === obituary._id}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {deletingId === obituary._id ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}