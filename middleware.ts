//This middleware is useful for protecting the routes we don't want user to access wihtout logging in.
//We do this by importing a createRouteMatcher which takes in an array of routes.


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//createRouteMatcher outputs a function, here protectedRoutes which takes in a route as an arguement 
//and checks if the passed route matches any of the routes in the array.

const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)'
])

export default clerkMiddleware((auth, req) => {
  if(protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};