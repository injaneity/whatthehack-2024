import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(async (auth) => {
    await auth.protect()
  })

export const config = {
    matcher: [
      '/((?!sign-in|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  }