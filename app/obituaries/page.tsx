'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ObituaryCard from '@/components/obituary/ObituaryCard';
import SearchForm from '@/components/obituary/SearchForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ObituariesPage() {
  const searchParams = useSearchParams();
  const [obituaries, setObituaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const [searchFilters, setSearchFilters] = useState({
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  });

  useEffect(() => {
    fetchObituaries(1);
  }, []);

  const fetchObituaries = async (page: number) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...searchFilters,
      });

      const response = await fetch(`/api/obituaries?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setObituaries(data.obituaries);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching obituaries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    fetchObituaries(1);
  };

  const handlePageChange = (newPage: number) => {
    fetchObituaries(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Obituaries
          </h1>
          <p className="text-lg text-gray-600">
            Honoring the lives of those who have touched our hearts
          </p>
        </div>

        <div className="mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading obituaries...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              Found {pagination.total} obituaries
            </div>
            
            {obituaries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No obituaries found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {obituaries.map((obituary: any) => (
                  <ObituaryCard key={obituary._id} obituary={obituary} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
                
                <div className="flex space-x-1">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={pagination.page === i + 1 ? "default" : "outline"}
                      onClick={() => handlePageChange(i + 1)}
                      className="w-10 h-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}