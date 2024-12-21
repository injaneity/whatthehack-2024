import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <ClerkProvider>
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ishowscripts
          </Link>
          <div className="flex items-center">
            <Button className="w-40" asChild>
              <Link href="/new-listing">New Listing</Link>
            </Button>
            <Button className="w-40 p-0" variant="link" asChild>
              <Link href="/my-listings">My Listings</Link>
            </Button>
            <Button className="w-40 p-0" variant="link" asChild>
              <Link href="/my-purchases">My Purchases</Link>
            </Button>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </ClerkProvider>
  );
}

