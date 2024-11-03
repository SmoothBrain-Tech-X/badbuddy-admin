import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/venue");
  return <div>Page</div>;
}

export const dynamic = "force-dynamic";
