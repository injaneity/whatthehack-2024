import { SignedIn, UserButton } from '@clerk/nextjs'
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
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Header() {
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
                    Make changes to your profile here. Click save when youre done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <SignedIn>
              <UserButton/>
            </SignedIn>
        </div>
      </header>
  );
}

