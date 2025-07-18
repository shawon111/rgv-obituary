'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Eye, 
  Clock,
  Users,
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CommentSection from '@/components/obituary/CommentSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ObituaryDetailsPage() {
  const params = useParams();
  const [obituary, setObituary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchObituary();
    }
  }, [params.id]);

  const fetchObituary = async () => {
    try {
      const response = await fetch(`/api/obituaries/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setObituary(data.obituary);
      }
    } catch (error) {
      console.error('Error fetching obituary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading obituary...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!obituary) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Obituary not found.</p>
            <Link href="/obituaries">
              <Button className="mt-4">Back to Obituaries</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const birthDate = new Date(obituary.dates.birthDate);
  const deathDate = new Date(obituary.dates.deathDate);
  const age = deathDate.getFullYear() - birthDate.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/obituaries">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Obituaries</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Header Card */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  {obituary.featuredImage ? (
                    <img
                      src={obituary.featuredImage}
                      alt={`${obituary.firstName} ${obituary.lastName}`}
                      className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg flex items-center justify-center">
                      <span className="text-6xl font-bold text-gray-400">
                        {obituary.firstName.charAt(0)}{obituary.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {obituary.firstName} {obituary.lastName}
                      {obituary.maidenName && (
                        <span className="text-gray-600"> (née {obituary.maidenName})</span>
                      )}
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">{obituary.title}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Born: {format(birthDate, 'MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Passed: {format(deathDate, 'MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-gray-400" />
                      <span>Age: {age} years</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span>{obituary.viewCount} views</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Posted by {obituary.author.firstName} {obituary.author.lastName} on{' '}
                    {format(new Date(obituary.createdAt), 'MMMM dd, yyyy')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Life Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: obituary.description }}
              />
            </CardContent>
          </Card>

          {/* Service Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {obituary.funeralLocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Funeral Service</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {obituary.dates.funeralDate && (
                    <p><strong>Date:</strong> {format(new Date(obituary.dates.funeralDate), 'MMMM dd, yyyy')}</p>
                  )}
                  <p><strong>Venue:</strong> {obituary.funeralLocation.venue}</p>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p>{obituary.funeralLocation.address}</p>
                      <p>{obituary.funeralLocation.city}, {obituary.funeralLocation.state} {obituary.funeralLocation.zipCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {obituary.graveyardLocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Final Resting Place</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Cemetery:</strong> {obituary.graveyardLocation.venue}</p>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p>{obituary.graveyardLocation.address}</p>
                      <p>{obituary.graveyardLocation.city}, {obituary.graveyardLocation.state} {obituary.graveyardLocation.zipCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Family Information */}
          {(obituary.survivedBy?.length > 0 || obituary.predeceased?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Family</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {obituary.survivedBy?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Survived by:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {obituary.survivedBy.map((person: string, index: number) => (
                        <li key={index}>{person}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {obituary.predeceased?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Predeceased by:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {obituary.predeceased.map((person: string, index: number) => (
                        <li key={index}>{person}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Comments Section */}
          <CommentSection obituaryId={obituary._id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}