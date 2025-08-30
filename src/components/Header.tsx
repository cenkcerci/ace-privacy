'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

// Treat "true" or "1" as disabled; anything else means enabled
const isEnvTrue = (v?: string) => v === 'true' || v === '1';

export function Header() {
  const { isSignedIn } = useUser();
  const isClerkDisabled = isEnvTrue(process.env.NEXT_PUBLIC_DISABLE_CLERK);

  return (
    <header className="border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            PolicyGen
          </Link>

          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link
                href="/policy-generator"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Generator
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isClerkDisabled ? (
                <>
                  <Button variant="outline" size="sm" disabled>
                    Sign In
                  </Button>
                  <Button size="sm" disabled>
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  {!isSignedIn ? (
                    <>
                      <Link href="/sign-in">
                        <Button variant="outline" size="sm">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button size="sm">Sign Up</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/user"
                        className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                      >
                        Account
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
