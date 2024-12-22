import { SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

import * as React from 'react';

function generateRandomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function Header() {
  const [progress, setProgress] = React.useState(330); // Example points value
  const [voucherCode, setVoucherCode] = React.useState(""); // State for voucher code

  // Calculate dynamic bounds for the progress bar
  const lowerBound = Math.floor(progress / 100) * 100;
  const upperBound = lowerBound + 100;
  const progressPercentage = ((progress - lowerBound) / (upperBound - lowerBound)) * 100;

  const handleRedeem = () => {
    if (progress >= 100) {
      setVoucherCode(generateRandomCode()); // Generate voucher code

      // Gradually decrease points and update progress bar
      const decrementInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= progress - 100) {
            clearInterval(decrementInterval); // Stop when 100 points are deducted
            return prevProgress;
          }
          return prevProgress - 5;
        });
      }, 100); // Adjust interval for smooth decrement
    }
  };

  return (
    <header className="bg-[#5964C6] shadow-sm">
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

        <div className="flex-grow flex justify-start gap-4">
          <Button className="px-8 text-lg font-bold text-white" variant="link" asChild>
            <Link href="/my-listings">My Listings</Link>
          </Button>
          <Button className="pl-0 pr-8 text-lg font-bold text-white" variant="link" asChild>
            <Link href="/my-purchases">My Purchases</Link>
          </Button>
          <Button className="pl-0 pr-8 text-lg font-bold text-white" variant="link" asChild>
            <Link href="/">Marketplace</Link>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button className="w-40 text-lg font-bold" variant="default" asChild>
            <Link href="/new-listing">New Listing</Link>
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="pl-8 pr-8 text-lg font-bold text-white" variant="link">Points</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Points</DialogTitle>
              <DialogDescription>
                Give away items and reach 100 points to redeem vouchers!
              </DialogDescription>
            </DialogHeader>

            {/* Points and Progress Bar */}
            <div className='flex justify-center text-3xl font-bold mb-2'>{progress} pts</div>
            <div className="flex justify-between items-center text-sm">
              <span>{lowerBound}</span>
              <Progress value={progressPercentage} className="w-[100%] mx-2" />
              <span>{upperBound}</span>
            </div>
            
            {/* Voucher Code */}
            {voucherCode && (
              <div className='flex justify-center text-green-500 font-bold text-lg'>
                Voucher Code: {voucherCode}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                onClick={handleRedeem}
                disabled={progress < 100}
                className={progress < 100 ? "opacity-50 cursor-not-allowed" : ""}
              >
                Redeem!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}