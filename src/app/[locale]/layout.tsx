import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";

const locales = ["en", "fa"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages =
    locale === "fa"
      ? (await import("@/messages/fa.json")).default
      : (await import("@/messages/en.json")).default;

  const isRTL = locale === "fa";

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div dir={isRTL ? "rtl" : "ltr"}>{children}</div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
