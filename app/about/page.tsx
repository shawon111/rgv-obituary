import { Heart, Users, Clock, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We understand the difficulty of losing a loved one and approach every interaction with empathy and care.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of community support during times of grief and celebration of life.',
    },
    {
      icon: Clock,
      title: 'Preservation',
      description: 'We are committed to preserving precious memories for future generations to cherish.',
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, ensuring each tribute is meaningful and beautiful.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Eternal Memories
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                We provide a compassionate platform for families to honor their loved ones, 
                celebrate their lives, and preserve their memories for generations to come.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Eternal Memories was founded with a simple but profound mission: to help families 
                create beautiful, lasting tributes to their loved ones during one of life's most 
                challenging moments.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We understand that every life is unique and deserves to be celebrated in a way 
                that reflects their individual story, achievements, and the love they shared with 
                others. Our platform combines modern technology with heartfelt compassion to make 
                the process of creating and sharing obituaries as meaningful and stress-free as possible.
              </p>
              <p className="text-lg text-gray-600">
                Since our founding, we have helped thousands of families honor their loved ones 
                and connect with their communities during times of loss. We are proud to be a 
                trusted resource for families seeking to preserve and share precious memories.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600">
                These core values guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What We Do
              </h2>
              <p className="text-lg text-gray-600">
                We provide comprehensive tools and support for honoring loved ones
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Create Beautiful Obituaries</h3>
                  <p className="text-gray-600">
                    Our intuitive platform makes it easy to create professional, heartfelt obituaries 
                    with rich text editing, photo integration, and customizable layouts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Share Memories</h3>
                  <p className="text-gray-600">
                    Family and friends can share memories, condolences, and stories through 
                    our comment system, creating a lasting digital memorial.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Preserve Legacies</h3>
                  <p className="text-gray-600">
                    All obituaries are preserved indefinitely, ensuring that future generations 
                    can learn about and remember their family history.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Search & Discover</h3>
                  <p className="text-gray-600">
                    Our powerful search functionality helps people find obituaries and connect 
                    with families during important times.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Community Support</h3>
                  <p className="text-gray-600">
                    We foster a supportive community where families can find comfort and 
                    connection during difficult times.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                  <p className="text-gray-600">
                    We take privacy seriously and provide secure, reliable hosting for all 
                    obituaries and personal information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We're Here to Help
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                If you have questions about our services or need assistance creating an obituary, 
                our compassionate support team is here to help you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:support@eternalmemories.com" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Email Us
                </a>
                <a href="tel:+15551234567" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}