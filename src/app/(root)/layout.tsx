import { auth } from "@/server/auth";
import LayoutProvider from "../_providers/LayoutProvider";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <LayoutProvider>{children}</LayoutProvider>;
}

export const dynamic = "force-dynamic";
