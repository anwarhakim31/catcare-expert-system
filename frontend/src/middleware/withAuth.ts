import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { jwtVerify } from "jose";
const authPage = ["login", "register", "forget-password"];

export default function withAuth(
  mainMiddleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, ev: NextFetchEvent) => {
    const cookie = req.cookies.get("catcare")?.value || "";
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (!cookie && requireAuth.includes(pathname)) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));

      return NextResponse.redirect(url);
    }

    if (cookie) {
      if (authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      const { payload } = (await jwtVerify(cookie, secret, {
        algorithms: ["HS256"],
      })) as { payload: { exp: number; isAdmin: boolean } };

      if (!payload.isAdmin && pathname === "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return mainMiddleware(req, ev);
  };

  //      const encryptedToken = req.cookies.get("catcare")?.value || "";
  //   const { pathname, origin } = req.nextUrl;
  //   if (!encryptedToken) {
  //     return NextResponse.next();
  //   }
  //   try {
}
