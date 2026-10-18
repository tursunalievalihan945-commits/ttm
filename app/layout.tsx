import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = (() => {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    return fromEnv;
  }

  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const [owner, repoName] = repo.split("/");
    if (repoName?.endsWith(".github.io")) {
      return `https://${repoName}`;
    }
    if (owner && repoName) {
      return `https://${owner}.github.io/${repoName}`;
    }
  }

  return "http://localhost:3000";
})();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Финансовое образование для взрослых — курс Манапбаевой Нураим Замирбековны",
    template: "%s | Деньги без сложностей",
  },
  description: "Курс Манапбаевой Нураим Замирбековны: понятный разговор о деньгах, активах, финансовых инструментах и личной стратегии без обещаний доходности.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteUrl,
    siteName: "financeweb.ssite",
    title: "financeweb.ssite",
    description: "Узнайте программу курса о деньгах, активах и финансовых решениях.",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "financeweb.ssite",
    description: "Узнайте программу курса о деньгах, активах и финансовых решениях.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
