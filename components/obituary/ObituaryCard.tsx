import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MapPin, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ObituaryCardProps {
  obituary: {
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    featuredImage?: string;
    description: string;
    dates: {
      birthDate: string;
      deathDate: string;
    };
    funeralLocation?: {
      venue: string;
      city: string;
      state: string;
    };
    viewCount: number;
    author: {
      firstName: string;
      lastName: string;
    };
    createdAt: string;
  };
}

export default function ObituaryCard({ obituary }: ObituaryCardProps) {
  const birthDate = new Date(obituary.dates.birthDate);
  const deathDate = new Date(obituary.dates.deathDate);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/obituaries/${obituary._id}`}>
        <div className="aspect-video bg-gray-200 overflow-hidden">
          {obituary.featuredImage ? (
            <img
              src={obituary.featuredImage}
              alt={`${obituary.firstName} ${obituary.lastName}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">
                {obituary.firstName.charAt(0)}{obituary.lastName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader>
        <CardTitle className="text-xl">
          <Link href={`/obituaries/${obituary._id}`} className="hover:text-blue-600 transition-colors">
            {obituary.firstName} {obituary.lastName}
          </Link>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>
              {format(birthDate, 'MMM dd, yyyy')} - {format(deathDate, 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{obituary.viewCount} views</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-gray-700 line-clamp-3">
          {obituary.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>
        
        {obituary.funeralLocation && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{obituary.funeralLocation.venue}, {obituary.funeralLocation.city}, {obituary.funeralLocation.state}</span>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          Posted by {obituary.author.firstName} {obituary.author.lastName} on {format(new Date(obituary.createdAt), 'MMM dd, yyyy')}
        </div>
      </CardContent>
    </Card>
  );
}