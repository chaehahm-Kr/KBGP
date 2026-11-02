import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/nav/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PrivacyPolicyView } from "@/components/privacy/privacy-policy-view";
import { PrivacyLanguage } from "@/lib/privacy-policy-data";

interface PrivacyPageProps {
  searchParams?: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: PrivacyPageProps): Promise<Metadata> {
  const resolved = searchParams ? await searchParams : {};
  const isEn = resolved?.lang === "en";

  return {
    title: isEn
      ? "K SELECT NETWORK | Privacy Policy"
      : "K SELECT NETWORK | 개인정보처리방침",
    description: isEn
      ? "Privacy Policy for K SELECT NETWORK operated by Letusto Inc. Effective August 1, 2026."
      : "K SELECT NETWORK 개인정보처리방침 (운영사: Letusto Inc., 시행일: 2026년 8월 1일)",
    alternates: {
      canonical: "https://www.kselectnetwork.com/privacy",
    },
  };
}

export default async function PrivacyPage({ searchParams }: PrivacyPageProps) {
  const resolved = searchParams ? await searchParams : {};
  const initialLang: PrivacyLanguage = resolved?.lang === "en" ? "en" : "ko";

  return (
    <>
      <SiteHeader />
      <PrivacyPolicyView initialLang={initialLang} />
      <SiteFooter lang={initialLang} />
    </>
  );
}
