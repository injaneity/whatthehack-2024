import { SignedIn, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Image from 'next/image';

export default function Header() {
  return (
      <header className="bg-[#ffffff] shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold text-gray-900">
            <Image
                src="/assets/logo.png"
                alt="Logo"
                width={180}
                height={180}
                className="mr-2"
            />
          </Link>
          <div className="flex items-center">
            <Button className="w-40" variant="default" asChild>
              <Link href="/new-listing">New Listing</Link>
            </Button>
            <Button className="px-6" variant="link" asChild>
              <Link href="/my-listings">My Listings</Link>
            </Button>
            <Button className="pl-0 pr-6" variant="link" asChild>
              <Link href="/my-purchases">My Purchases</Link>
            </Button>
            <Button className="pl-0 pr-6" variant="link" asChild>
              <Link href="/">Marketplace</Link>
            </Button>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </div>
        </div>
      </header>
  );
}

