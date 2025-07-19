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

export default function HomePage() {
  const [recentObituaries, setRecentObituaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({ firstName: '', lastName: '' });

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
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-16 md:py-24">
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
              <form className="flex gap-2" onSubmit={e => { e.preventDefault(); window.location.href = `/obituaries?firstName=${search.firstName}&lastName=${search.lastName}`; }}>
                <Input
                  placeholder="First Name"
                  value={search.firstName}
                  onChange={e => setSearch(s => ({ ...s, firstName: e.target.value }))}
                  className="bg-gray-100"
                />
                <Input
                  placeholder="Last Name"
                  value={search.lastName}
                  onChange={e => setSearch(s => ({ ...s, lastName: e.target.value }))}
                  className="bg-gray-100"
                />
                <Button type="submit" variant="secondary" className="px-3"><Search className="w-4 h-4" /></Button>
              </form>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=600&q=80"
              alt="Smiling elderly couple"
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">We help you honor their life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="flex flex-col md:flex-row items-center gap-4 p-6">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=120&q=80" alt="Legacy Memorial" className="w-24 h-24 rounded-lg object-cover" />
              <div>
                <CardTitle>Legacy Memorial</CardTitle>
                <CardContent className="p-0 pt-2 text-gray-600">A lasting online space where family & friends share memories of a loved one.</CardContent>
                <Link href="/dashboard/create" className="text-blue-600 text-sm font-semibold mt-2 inline-block">Get Started →</Link>
              </div>
            </Card>
            <Card className="flex flex-col md:flex-row items-center gap-4 p-6">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=120&q=80" alt="The Obituary" className="w-24 h-24 rounded-lg object-cover" />
              <div>
                <CardTitle>The Obituary</CardTitle>
                <CardContent className="p-0 pt-2 text-gray-600">Your loved one's life story, published & preserved as a precious tribute for generations to come.</CardContent>
                <Link href="/dashboard/create" className="text-blue-600 text-sm font-semibold mt-2 inline-block">Create an Obituary →</Link>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center p-4">
              <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=facearea&w=80&q=80" alt="Flowers & Gifts" className="w-16 h-16 rounded-full object-cover mb-2" />
              <CardTitle className="text-base">Flowers & Gifts</CardTitle>
            </Card>
            <Card className="flex flex-col items-center p-4">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=80&q=80" alt="Memorial Trees" className="w-16 h-16 rounded-full object-cover mb-2" />
              <CardTitle className="text-base">Memorial Trees</CardTitle>
            </Card>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>

      {/* Planning Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&q=80" alt="Family" className="rounded-lg shadow w-full max-w-sm mb-6 md:mb-0" />
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">'How do I protect my family after I'm gone?'</h3>
            <p className="text-gray-700 mb-4">Have you made a will? A funeral directive? A plan for your pets? It adds up to peace of mind. Now it's quick & easy to do.</p>
            <Button variant="outline" className="border-blue-600 text-blue-600">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Featured Obituaries Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Today's Featured Obituaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Example featured obituaries, replace with real data if available */}
            <Card className="p-4 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Felix Baumgartner" className="w-24 h-24 rounded-full object-cover mb-2" />
              <CardTitle className="text-lg">Felix Baumgartner</CardTitle>
              <div className="text-gray-500 text-sm">1969–2025</div>
              <div className="text-xs text-gray-400">Stratosphere skydiver</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Bryan Braman" className="w-24 h-24 rounded-full object-cover mb-2" />
              <CardTitle className="text-lg">Bryan Braman</CardTitle>
              <div className="text-gray-500 text-sm">1987–2025</div>
              <div className="text-xs text-gray-400">Super Bowl champ with Philadelphia Eagles</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="John MacArthur" className="w-24 h-24 rounded-full object-cover mb-2" />
              <CardTitle className="text-lg">John MacArthur</CardTitle>
              <div className="text-gray-500 text-sm">1939–2025</div>
              <div className="text-xs text-gray-400">Prominent evangelical pastor</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Connie Francis" className="w-24 h-24 rounded-full object-cover mb-2" />
              <CardTitle className="text-lg">Connie Francis</CardTitle>
              <div className="text-gray-500 text-sm">1937–2025</div>
              <div className="text-xs text-gray-400">1960s chart-topping singer</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Browse By Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-6">Browse Obituaries by</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="min-w-[120px]">City</Button>
            <Button variant="outline" className="min-w-[120px]">High School</Button>
            <Button variant="outline" className="min-w-[120px]">College</Button>
            <Button variant="outline" className="min-w-[120px]">Newspaper</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl mb-2">Legacy.com</div>
            <div className="flex gap-2 mb-4">
              <a href="#" aria-label="Facebook" className="hover:text-blue-400"><svg width="24" height="24" fill="currentColor"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"/></svg></a>
              <a href="#" aria-label="YouTube" className="hover:text-red-400"><svg width="24" height="24" fill="currentColor"><path d="M21.8 8.001s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.2 5 12 5 12 5h-.1s-4.2 0-7.1.1c-.4.1-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9 1.5.1 6.9.1 6.9.1s4.2 0 7.1-.1c.4-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 15.1V8.9l6.4 3.1-6.4 3.1z"/></svg></a>
            </div>
            <div className="text-xs text-gray-400">©2025 Legacy.com All rights reserved.</div>
          </div>
          <div>
            <div className="font-semibold mb-2">Create an Obituary</div>
            <ul className="text-sm space-y-1 text-gray-300">
              <li><a href="#">Submit an obituary</a></li>
              <li><a href="#">Write an obituary</a></li>
              <li><a href="#">Obituary and Eulogy Tips</a></li>
              <li><a href="#">Obituary templates</a></li>
              <li><a href="#">Obituary examples</a></li>
              <li><a href="#">How to write an obituary</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Find an Obituary</div>
            <ul className="text-sm space-y-1 text-gray-300">
              <li><a href="#">High school</a></li>
              <li><a href="#">College</a></li>
              <li><a href="#">Funeral home</a></li>
              <li><a href="#">City</a></li>
              <li><a href="#">Newspaper</a></li>
              <li><a href="#">Celebrities</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Funeral & Estate Planning</div>
            <ul className="text-sm space-y-1 text-gray-300">
              <li><a href="#">Find a funeral home</a></li>
              <li><a href="#">Estate planning guide</a></li>
              <li><a href="#">Plan & price a funeral</a></li>
              <li><a href="#">Help with grief & loss</a></li>
              <li><a href="#">Attend a funeral</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}