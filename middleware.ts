import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // auth related urls
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // public path
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        return !!token
      },
    },
  }
);


export const config = {
    matcher : [
         "/",
         "/api/auth/*",
         "/login",
         "/register",
         "/api/videos/*",
         "/video/[id]",
         
    ]
}