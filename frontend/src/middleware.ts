import { NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

function middleware() {
  return NextResponse.next();
}

export default withAuth(middleware, ["admin", "profil", "riwayat"]);
