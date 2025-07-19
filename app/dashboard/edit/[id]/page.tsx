"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RichTextEditor from '@/components/obituary/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface ObituaryLocation {
  venue: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ObituaryDates {
  birthDate: string;
  deathDate: string;
  funeralDate?: string;
  visitationDate?: string;
}

interface ObituaryForm {
  title: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  featuredImage?: string;
  description: string;
  dates: ObituaryDates;
  funeralLocation: ObituaryLocation;
  graveyardLocation: ObituaryLocation;
  survivedBy: string[];
  predeceased: string[];
  isPublished: boolean;
}

const emptyForm: ObituaryForm = {
  title: '',
  firstName: '',
  lastName: '',
  maidenName: '',
  featuredImage: '',
  description: '',
  dates: {
    birthDate: '',
    deathDate: '',
    funeralDate: '',
    visitationDate: '',
  },
  funeralLocation: {
    venue: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  },
  graveyardLocation: {
    venue: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  },
  survivedBy: [''],
  predeceased: [''],
  isPublished: false,
};

const EditPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [formData, setFormData] = useState<ObituaryForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchObituary = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/obituaries/${id}`);
        const data = await res.json();
        if (res.ok && data.obituary) {
          // Convert dates to yyyy-MM-dd for input fields
          const toDateInput = (d: string | undefined) => d ? new Date(d).toISOString().slice(0, 10) : '';
          setFormData({
            ...emptyForm,
            ...data.obituary,
            dates: {
              birthDate: toDateInput(data.obituary.dates?.birthDate),
              deathDate: toDateInput(data.obituary.dates?.deathDate),
              funeralDate: toDateInput(data.obituary.dates?.funeralDate),
              visitationDate: toDateInput(data.obituary.dates?.visitationDate),
            },
            funeralLocation: {
              ...emptyForm.funeralLocation,
              ...data.obituary.funeralLocation,
            },
            graveyardLocation: {
              ...emptyForm.graveyardLocation,
              ...data.obituary.graveyardLocation,
            },
            survivedBy: data.obituary.survivedBy?.length ? data.obituary.survivedBy : [''],
            predeceased: data.obituary.predeceased?.length ? data.obituary.predeceased : [''],
          });
        } else {
          setError(data.error || 'Obituary not found');
        }
      } catch (err) {
        setError('Failed to fetch obituary');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchObituary();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (field: 'survivedBy' | 'predeceased', index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'survivedBy' | 'predeceased') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field: 'survivedBy' | 'predeceased', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      // Clean up empty array items
      const cleanedData = {
        ...formData,
        survivedBy: formData.survivedBy.filter((item) => item.trim() !== ''),
        predeceased: formData.predeceased.filter((item) => item.trim() !== ''),
      };
      const res = await fetch(`/api/obituaries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to update obituary');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Edit Obituary
          </h1>
          <p className="text-lg text-gray-600">
            Update the story of your loved one
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Obituary Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maidenName">Maiden Name (Optional)</Label>
                <Input
                  id="maidenName"
                  name="maidenName"
                  value={formData.maidenName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="featuredImage">Featured Image URL (Optional)</Label>
                <Input
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
          {/* Life Story */}
          <Card>
            <CardHeader>
              <CardTitle>Life Story</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.description}
                onChange={(value: string) => setFormData((prev) => ({ ...prev, description: value }))}
                placeholder="Share the story of your loved one's life..."
              />
            </CardContent>
          </Card>
          {/* Important Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dates.birthDate">Birth Date</Label>
                  <Input
                    id="dates.birthDate"
                    name="dates.birthDate"
                    type="date"
                    value={formData.dates.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dates.deathDate">Death Date</Label>
                  <Input
                    id="dates.deathDate"
                    name="dates.deathDate"
                    type="date"
                    value={formData.dates.deathDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dates.funeralDate">Funeral Date (Optional)</Label>
                  <Input
                    id="dates.funeralDate"
                    name="dates.funeralDate"
                    type="date"
                    value={formData.dates.funeralDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dates.visitationDate">Visitation Date (Optional)</Label>
                  <Input
                    id="dates.visitationDate"
                    name="dates.visitationDate"
                    type="date"
                    value={formData.dates.visitationDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Funeral Location */}
          <Card>
            <CardHeader>
              <CardTitle>Funeral Service Location (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="funeralLocation.venue">Venue Name</Label>
                <Input
                  id="funeralLocation.venue"
                  name="funeralLocation.venue"
                  value={formData.funeralLocation.venue}
                  onChange={handleChange}
                  placeholder="e.g., St. Mary's Church, Johnson Funeral Home"
                />
              </div>
              <div>
                <Label htmlFor="funeralLocation.address">Address</Label>
                <Input
                  id="funeralLocation.address"
                  name="funeralLocation.address"
                  value={formData.funeralLocation.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="funeralLocation.city">City</Label>
                  <Input
                    id="funeralLocation.city"
                    name="funeralLocation.city"
                    value={formData.funeralLocation.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="funeralLocation.state">State</Label>
                  <Input
                    id="funeralLocation.state"
                    name="funeralLocation.state"
                    value={formData.funeralLocation.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="funeralLocation.zipCode">ZIP Code</Label>
                  <Input
                    id="funeralLocation.zipCode"
                    name="funeralLocation.zipCode"
                    value={formData.funeralLocation.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Graveyard Location */}
          <Card>
            <CardHeader>
              <CardTitle>Final Resting Place (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="graveyardLocation.venue">Cemetery Name</Label>
                <Input
                  id="graveyardLocation.venue"
                  name="graveyardLocation.venue"
                  value={formData.graveyardLocation.venue}
                  onChange={handleChange}
                  placeholder="e.g., Peaceful Gardens Cemetery"
                />
              </div>
              <div>
                <Label htmlFor="graveyardLocation.address">Address</Label>
                <Input
                  id="graveyardLocation.address"
                  name="graveyardLocation.address"
                  value={formData.graveyardLocation.address}
                  onChange={handleChange}
                  placeholder="123 Cemetery Road"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="graveyardLocation.city">City</Label>
                  <Input
                    id="graveyardLocation.city"
                    name="graveyardLocation.city"
                    value={formData.graveyardLocation.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="graveyardLocation.state">State</Label>
                  <Input
                    id="graveyardLocation.state"
                    name="graveyardLocation.state"
                    value={formData.graveyardLocation.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="graveyardLocation.zipCode">ZIP Code</Label>
                  <Input
                    id="graveyardLocation.zipCode"
                    name="graveyardLocation.zipCode"
                    value={formData.graveyardLocation.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Survived By */}
          <Card>
            <CardHeader>
              <CardTitle>Survived By (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {formData.survivedBy.map((person, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={person}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleArrayChange('survivedBy', idx, e.target.value)}
                    placeholder="e.g., John Doe (Son)"
                  />
                  <Button type="button" variant="outline" onClick={() => removeArrayItem('survivedBy', idx)} disabled={formData.survivedBy.length === 1}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={() => addArrayItem('survivedBy')}>
                Add Person
              </Button>
            </CardContent>
          </Card>
          {/* Predeceased */}
          <Card>
            <CardHeader>
              <CardTitle>Predeceased (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {formData.predeceased.map((person, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={person}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleArrayChange('predeceased', idx, e.target.value)}
                    placeholder="e.g., Jane Doe (Mother)"
                  />
                  <Button type="button" variant="outline" onClick={() => removeArrayItem('predeceased', idx)} disabled={formData.predeceased.length === 1}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={() => addArrayItem('predeceased')}>
                Add Person
              </Button>
            </CardContent>
          </Card>
          {/* Publish Switch */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Switch
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked: boolean) => setFormData((prev) => ({ ...prev, isPublished: checked }))}
                />
                <Label htmlFor="isPublished">Publish this obituary</Label>
              </div>
            </CardContent>
          </Card>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center space-x-2" disabled={isSaving}>
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditPage;