'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Container } from '@/components/ui/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

type PolicyData = { privacyHTML: string; cookieHTML: string };

type UserData = {
  userId: string | null;
  email: string | null;
  plan: 'free' | 'pro' | string;
  limits: { gensPerDay: number; pdf: boolean };
};

const isEnvTrue = (v?: string) => v === 'true' || v === '1';

export default function PolicyGeneratorPage() {
  const { isSignedIn, isLoaded } = useUser();
  const clerkDisabled = isEnvTrue(process.env.NEXT_PUBLIC_DISABLE_CLERK);

  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    jurisdiction: 'Global',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [policies, setPolicies] = useState<PolicyData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (clerkDisabled) return;
    if (!isLoaded) return;
    if (!isSignedIn) {
      setUserData(null);
      return;
    }
    fetch('/api/me')
      .then((r) => r.json())
      .then((data) => !data?.error && setUserData(data))
      .catch(() => {});
  }, [isLoaded, isSignedIn, clerkDisabled]);

  const validateForm = () => {
    const next: Record<string, string> = {};
    if (!formData.businessName.trim()) next.businessName = 'Business name is required';
    if (!formData.website.trim()) next.website = 'Website URL is required';
    else if (!formData.website.includes('.')) next.website = 'Please enter a valid website URL';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to generate policies');
      const data = (await res.json()) as PolicyData;
      setPolicies(data);
    } catch {
      alert('Failed to generate policies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  const downloadHTML = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (content: string, filename: string, title: string) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(formData.businessName || 'Your Business', margin, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    pdf.text(`Generated: ${dateStr}`, margin, y);
    y += 15;

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin, y);
    y += 15;

    const temp = document.createElement('div');
    temp.innerHTML = content;
    const els = temp.querySelectorAll('*');

    els.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const text = el.textContent?.trim() || '';
      if (!text) return;

      if (y > pageHeight - 30) {
        pdf.addPage();
        y = margin;
      }

      switch (tag) {
        case 'h1':
          pdf.setFontSize(16);
          pdf.setFont('helvetica', 'bold');
          y += 10;
          break;
        case 'h2':
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          y += 8;
          break;
        case 'h3':
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          y += 6;
          break;
        case 'li':
        case 'p':
        default:
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          y += tag === 'li' ? 3 : 4;
      }

      const lines = pdf.splitTextToSize(text, maxWidth);
      if (tag === 'li') {
        pdf.text('• ', margin, y);
        pdf.text(lines, margin + 10, y);
      } else {
        pdf.text(lines, margin, y);
      }
      y += lines.length * 5;
    });

    pdf.save(filename);
  };

  const mustSignIn = !clerkDisabled && isLoaded && !isSignedIn;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Policy Generator</h1>
              <p className="text-gray-600">
                Fill in your business details to generate customized privacy and cookie policies
              </p>
            </div>

            {/* Sign-in required panel */}
            {mustSignIn && (
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
                <p className="text-gray-700 mb-4">Please sign in to generate and save policies to your account.</p>
                <div className="flex justify-center gap-3">
                  <Link href="/sign-in">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Form (when signed-in or Clerk disabled) */}
            {!mustSignIn && !policies && (
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <Input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Enter your business name"
                      className={errors.businessName ? 'border-red-500' : ''}
                    />
                    {errors.businessName && (
                      <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL *
                    </label>
                    <Input
                      id="website"
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                      className={errors.website ? 'border-red-500' : ''}
                    />
                    {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                  </div>

                  {/* Jurisdiction: selectable radios */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jurisdiction"
                          value="Global"
                          checked={formData.jurisdiction === 'Global'}
                          onChange={(e) =>
                            setFormData({ ...formData, jurisdiction: e.target.value })
                          }
                          className="mt-1"
                        />
                        <span className="font-medium">Global</span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="jurisdiction"
                          value="EU"
                          checked={formData.jurisdiction === 'EU'}
                          onChange={(e) =>
                            setFormData({ ...formData, jurisdiction: e.target.value })
                          }
                          className="mt-1"
                        />
                        <span className="font-medium">European Union (GDPR)</span>
                      </label>
                    </div>

                    {/* Top row: Generate New + Plan badge or Sign In hint */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                      <Button variant="outline" onClick={() => setPolicies(null)}>
                        Generate New
                      </Button>

                      {!clerkDisabled && (
                        <>
                          <SignedIn>
                            {userData && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Plan:</span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    userData.plan === 'pro'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {userData.plan === 'pro' ? 'Pro' : 'Free'}
                                </span>
                              </div>
                            )}
                          </SignedIn>

                          <SignedOut>
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-2">Sign in to save and track usage</p>
                              <Link href="/sign-in">
                                <Button size="sm" variant="outline">
                                  Sign In
                                </Button>
                              </Link>
                            </div>
                          </SignedOut>
                        </>
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                    {isLoading ? 'Generating Policies…' : 'Generate Policies'}
                  </Button>
                </form>
              </div>
            )}

            {/* Results */}
            {!mustSignIn && policies && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Policies Are Ready</h2>
                  <p className="text-gray-600 mb-6">
                    Your customized privacy and cookie policies have been generated successfully
                  </p>
                  <Button variant="outline" onClick={() => setPolicies(null)} className="mb-8">
                    Generate New
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Tabs defaultValue="privacy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1 rounded-none">
                      <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                      <TabsTrigger value="cookie">Cookie Policy</TabsTrigger>
                    </TabsList>

                    <div className="p-6 md:p-8">
                      <TabsContent value="privacy" className="mt-0">
                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={() => copyToClipboard(policies.privacyHTML)} variant="outline">
                              Copy HTML
                            </Button>
                            <Button
                              onClick={() => downloadHTML(policies.privacyHTML, 'privacy-policy.html')}
                              variant="outline"
                            >
                              Download HTML
                            </Button>
                            <Button
                              onClick={() =>
                                downloadPDF(policies.privacyHTML, 'privacy-policy.pdf', 'Privacy Policy')
                              }
                              variant="outline"
                              disabled={!clerkDisabled && (userData ? !userData.limits.pdf : true)}
                            >
                              {!clerkDisabled && userData && !userData.limits.pdf ? 'PDF (Pro Only)' : 'Download PDF'}
                            </Button>
                          </div>
                          <div className="bg-gray-50 rounded-lg border">
                            <div
                              className="p-6 max-h-96 overflow-y-auto prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: policies.privacyHTML }}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="cookie" className="mt-0">
                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={() => copyToClipboard(policies.cookieHTML)} variant="outline">
                              Copy HTML
                            </Button>
                            <Button
                              onClick={() => downloadHTML(policies.cookieHTML, 'cookie-policy.html')}
                              variant="outline"
                            >
                              Download HTML
                            </Button>
                            <Button
                              onClick={() =>
                                downloadPDF(policies.cookieHTML, 'cookie-policy.pdf', 'Cookie Policy')
                              }
                              variant="outline"
                              disabled={!clerkDisabled && (userData ? !userData.limits.pdf : true)}
                            >
                              {!clerkDisabled && userData && !userData.limits.pdf ? 'PDF (Pro Only)' : 'Download PDF'}
                            </Button>
                          </div>
                          <div className="bg-gray-50 rounded-lg border">
                            <div
                              className="p-6 max-h-96 overflow-y-auto prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: policies.cookieHTML }}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
