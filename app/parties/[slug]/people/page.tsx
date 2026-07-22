import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartyLeadershipPage } from "@/components/party-leadership-page";
import { createMetadata } from "@/lib/seo";
import { getLeadershipPartySlugs, getPartyLeadershipPageBySlug } from "@/political-data/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLeadershipPartySlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPartyLeadershipPageBySlug(slug);

  return createMetadata({
    description: data
      ? `Verified senior leadership records for ${data.party.name}, with effective dates and reviewed primary-source evidence.`
      : "Verified party leadership records with reviewed primary-source evidence.",
    index: false,
    path: `/parties/${slug}/people`,
    title: data
      ? `${data.party.name} leadership - Plain Politics`
      : "Party leadership - Plain Politics"
  });
}

export default async function PartyPeoplePage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPartyLeadershipPageBySlug(slug);

  if (!data) {
    notFound();
  }

  return <PartyLeadershipPage data={data} />;
}
