import { redirect } from "next/navigation";
import { createMetadata, getRouteMetadata } from "@/lib/seo";

const pageMetadata = getRouteMetadata("/methodology");

export const metadata = createMetadata(pageMetadata);

export default function MethodologyRedirect() {
  redirect("/about");
}
