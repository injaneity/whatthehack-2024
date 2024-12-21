'use client';

import { SignIn } from '@clerk/nextjs';
import {cn} from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SignIn
          path="/sign-in"
          routing="path"
        />
        <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
                "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
            )}
        />
    </div>
  );
}
