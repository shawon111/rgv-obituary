"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ObituaryCard from '@/components/obituary/ObituaryCard';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';
import HeroImage from '@/assets/hero-img.jpg';
import Image from 'next/image';
import legacyMemoryImg from '@/assets/legacy-memory.jpg';

export default function HomePage() {
  const [recentObituaries, setRecentObituaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecentObituaries();
  }, []);

  const fetchRecentObituaries = async () => {
    try {
      const response = await fetch('/api/obituaries?limit=4&sortBy=createdAt&sortOrder=desc');
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

  // --- HERO SECTION ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-[500px] bg-[#FAFAF9] overflow-hidden animate-fade-in">
        {/* Diagonal Fade Grid Background - Top Right */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e0e1dd 1px, transparent 1px),
              linear-gradient(to bottom, #e0e1dd 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-16 md:py-24 relative z-10">
          {/* Left: Text & Form */}
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Where life stories live on</h1>
            <div className="bg-white rounded-lg shadow p-6 mt-6 w-full max-w-md">
              <Button className="w-full mb-4" asChild>
                <Link href="/dashboard/create">Write an Obituary</Link>
              </Button>
              <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-semibold">
                <span>or</span>
                <span>Search Obituaries</span>
              </div>
              <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (search.trim()) { window.location.href = `/obituaries?search=${encodeURIComponent(search)}`; } else { window.location.href = '/obituaries'; } }}>
                <Input
                  placeholder="Search obituaries..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-gray-100"
                />
                <Button type="submit" variant="secondary" className="px-3"><Search className="w-4 h-4" /></Button>
              </form>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center animate-fade-in">
            <Image
              src={HeroImage}
              alt="Smiling elderly couple"
              className="rounded-xl shadow-lg w-full max-w-md object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16 bg-[#F6E7CB] animate-fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#6B9080]">We help you honor their life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="flex flex-col md:flex-row items-center gap-4 p-6 bg-white shadow hover:shadow-lg transition-all duration-300 border border-[#e0e1dd] animate-fade-in">
              <Image src={legacyMemoryImg} alt="Legacy Memorial" className="w-24 h-24 rounded-lg object-cover" />
              <div>
                <CardTitle>Legacy Memorial</CardTitle>
                <CardContent className="p-0 pt-2 text-gray-600">A lasting online space where family & friends share memories of a loved one.</CardContent>
                <Link href="/dashboard/create" className="text-blue-600 text-sm font-semibold mt-2 inline-block">Get Started →</Link>
              </div>
            </Card>
            <Card className="flex flex-col md:flex-row items-center gap-4 p-6 bg-white shadow hover:shadow-lg transition-all duration-300 border border-[#e0e1dd] animate-fade-in delay-100">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=120&q=80" alt="The Obituary" className="w-24 h-24 rounded-lg object-cover" />
              <div>
                <CardTitle>The Obituary</CardTitle>
                <CardContent className="p-0 pt-2 text-gray-600">Your loved one's life story, published & preserved as a precious tribute for generations to come.</CardContent>
                <Link href="/obituaries" className="text-blue-600 text-sm font-semibold mt-2 inline-block">Obituaries →</Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Obituaries Section */}
      <section className="py-16 bg-white animate-fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#6B9080]">Latest Obituaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center text-[#444B54]">Loading...</div>
            ) : recentObituaries && recentObituaries.length > 0 ? (
              recentObituaries.map((obituary: any) => (
                <ObituaryCard key={obituary._id} obituary={obituary} />
              ))
            ) : (
              <div className="col-span-3 text-center text-[#444B54]">No obituaries found.</div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}