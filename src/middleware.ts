// src/middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Apply the middleware to specific routes
export const config = {
  matcher: [
    '/listings/create',
    '/listings/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/((?!.*\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)',
  ],
};
