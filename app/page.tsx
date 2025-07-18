'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  Heart, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ObituaryCard from '@/components/obituary/ObituaryCard';

export default function HomePage() {
  const [recentObituaries, setRecentObituaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentObituaries();
  }, []);

  const fetchRecentObituaries = async () => {
    try {
      const response = await fetch('/api/obituaries?limit=3&sortBy=createdAt&sortOrder=desc');
      if (response.ok) {
        const data = await response.json();
        setRecentObituaries(data.obituaries);
      }
    } catch (error) {
      console.error('Error fetching recent obituaries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Creating my father's obituary was made so much easier with this platform. The interface is intuitive and the final result was beautiful.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      text: "The comment feature allowed our family and friends to share memories from around the world. It brought us together during a difficult time.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      text: "Professional service with compassionate support. They helped us honor my grandmother's memory in the most beautiful way.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Heart,
      title: "Heartfelt Tributes",
      description: "Create beautiful, personalized obituaries that truly honor your loved one's memory.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with family and friends through our comment system and shared memories.",
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Access obituaries anytime, anywhere. Memories are preserved forever.",
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Professional design and user-friendly interface for creating lasting tributes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Honoring Lives, Preserving Memories
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Create beautiful obituaries and celebrate the lives of those we love most
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Create an Obituary
                </Button>
              </Link>
              <Link href="/obituaries">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Browse Obituaries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Eternal Memories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a compassionate platform to honor your loved ones with dignity and care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Obituaries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Obituaries
            </h2>
            <p className="text-lg text-gray-600">
              Honoring the lives of those who have touched our hearts
            </p>
          </div>
          {isLoading ? (
            <div className="text-center py-8">Loading recent obituaries...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentObituaries.map((obituary: any) => (
                <ObituaryCard key={obituary._id} obituary={obituary} />
              ))}
            </div>
          )}
          {!isLoading && (
            <div className="text-center mt-12">
              <Link href="/obituaries">
                <Button size="lg" className="flex items-center space-x-2">
                  <span>View All Obituaries</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Families Say
            </h2>
            <p className="text-lg text-gray-600">
              Hear from families who have trusted us with their most precious memories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-semibold text-gray-900">- {testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help or Have Questions?
            </h2>
            <p className="text-lg">
              Our compassionate team is here to support you during this difficult time
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p>support@eternalmemories.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>123 Memory Lane<br />City, State 12345</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}