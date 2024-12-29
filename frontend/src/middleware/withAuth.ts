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

    if (!cookie) {
      if (requireAuth.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(url);
      }
    }

    return mainMiddleware(req, ev);
  };
}
